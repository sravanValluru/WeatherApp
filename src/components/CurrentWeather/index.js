import React, { useEffect, useState } from "react";

export default function CurrentWeather({ city, base, apiKey }) {
  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    console.log("CurrentWeather: useEffect");
    fetch(`${base}?q=${city}&appid=${apiKey}&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        console.log("CurrentWeather: data", data);
        if (data.cod === "404") {
          setWeatherInfo({});
        } else {
          setWeatherInfo(data);
          console.log(data.weather[0]);
        }
      })
      .catch((err) => console.log("CurrentWeather: err", err));
  }, [city, base, apiKey]);
  return (
    <div className="my-16">
      {Object.keys(weatherInfo).length == 0 && (
        <h3 className="mt-2 text-lg leading-8 font-semibold tracking-tight text-gray-900 sm:text-2xl">
          Oh no!! City not found.
        </h3>
      )}
      {weatherInfo.main && (
        <>
          <div
            className="grid gap-1 items-center bg-white rounded-lg shadow p-8"
            style={{ gridtemplateColumns: "20% 80%" }}
          >
            <h2 className="col-span-2 text-xl leading-2 text-indigo-600 font-semibold tracking-wide uppercase">
              {city.toUpperCase()}
            </h2>
            <img
              className="col-span-1 w-20"
              alt={weatherInfo.weather[0].description}
              src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`}
              //   style={{ width: "70px" }}
            />{" "}
            <h3 className="col-span-1 mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              {weatherInfo.main && weatherInfo.main.temp} °c
            </h3>
            <h3 className="col-span-1 mt-2 p-1 text-sm leading-3 font-light tracking-tight text-gray-900 sm:text-lg">
              {weatherInfo.weather[0].main}
            </h3>
            <h3 className="text-center col-span-1 mt-2 p-1 text-sm leading-3 font-light tracking-tight text-gray-900 sm:text-lg">
              Feels like {weatherInfo.main && weatherInfo.main.feels_like} °c
            </h3>
          </div>
        </>
      )}
    </div>
  );
}
