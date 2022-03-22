import React, { useState, useEffect } from "react";
// import moment
import moment from "moment";

export default function ForecastWeather({ city, base, apiKey }) {
  const [weatherForecastInfo, setWeatherForecastInfo] = useState({});

  useEffect(() => {
    console.log("Forecast Weather: useEffect");
    fetch(`${base}?q=${city}&appid=${apiKey}&units=metric&cnt=8`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Forecast Weather: data", data);
        if (data.cod === "404") {
          setWeatherForecastInfo({});
        } else {
          setWeatherForecastInfo(data);
          console.log(data.list);
        }
      })
      .catch((err) => console.log("Forecast Weather: err", err));
  }, [city, base, apiKey]);

  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };

  const getHour = ({ dt_txt, dt }) => {
    const date = moment(dt).format("YYYY-MM-DD");
    const myDate = moment(dt_txt, "YYYY-MM-DD").toDate();
    let today = " ";
    console.log("Forecast Weather: date", { date, myDate, dt_txt });
    if (isToday(myDate)) {
      today = "Today";
    } else {
      today = "Tomorrow";
    }
    // split the string with space
    const [day, hour] = dt_txt.split(" ");
    // convert to number and check if it is greater than 12
    const isAM = parseInt(hour) > 12 ? false : true;
    if (!isAM) {
      return `${today} - ${parseInt(hour) - 12}PM`;
    } else {
      return `${today} - ${hour.slice(0, 2)}AM`;
    }
  };
  return (
    <div
      className="w-full p-8 flex overflow-x-scroll scrollbar scrollbar-thumb-purple-900 scrollbar-track-purple-100"
      style={{ scrollbarWidth: "thin" }}
    >
      {Object.keys(weatherForecastInfo).length == 0 && (
        <p className="hidden"></p>
      )}
      {weatherForecastInfo.list &&
        weatherForecastInfo.list.map((item, index) => {
          return (
            <div
              key={item.dt}
              className="flex flex-col justify-center justify-items-center items-center bg-white rounded-lg shadow p-4 m-2 w-1/5"
              style={{ minWidth: "175px" }}
            >
              <p className="text-xl md:text-sm text-indigo-600 font-semibold tracking-tight uppercase">
                {getHour({ dt_txt: item.dt_txt, dt: item.dt })}
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="w-3/5"
              />

              <p className="text-xl md:text-xl text-slate-600 font-semibold tracking-tight uppercase">
                {item.main.temp} °c
              </p>
              <p className="text-sm md:text-sm text-slate-600 font-light tracking-tight uppercase">
                {item.weather[0].description}
              </p>
              <div className="flex w-full content-between place-content-between mt-2">
                <p className="w-2/6 text-sm md:text-sm text-slate-600 font-light tracking-tight uppercase">
                  <span className="font-semibold">MIN:</span>{" "}
                  {item.main.temp_min}°c
                </p>
                <p className="w-2/6 text-sm md:text-sm text-slate-600 font-light tracking-tight uppercase">
                  <span className="font-semibold">MAX:</span>{" "}
                  {item.main.temp_max}°c
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
