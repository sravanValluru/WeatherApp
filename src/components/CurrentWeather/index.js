import React, { useEffect, useState } from "react";

export default function CurrentWeather({
  city,
  base,
  apiKey,
  favorites,
  setFavorites,
}) {
  const [weatherInfo, setWeatherInfo] = useState({});
  const [isToggle, setIsToggle] = useState(false);

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
    setIsToggle(false);
  }, [city, base, apiKey]);

  const handleFavorites = () => {
    console.log("CurrentWeather: handleFavorites");
    if (!favorites.includes(city)) {
      setIsToggle(!isToggle);
      setFavorites([...favorites, city]);
    }
  };

  return (
    <div className="my-12">
      {Object.keys(weatherInfo).length == 0 && (
        <h3 className="mt-2 text-lg leading-8 font-semibold tracking-tight text-gray-900 sm:text-2xl">
          Oh no!! City not found.
        </h3>
      )}
      {weatherInfo.main && (
        <>
          <div
            className="grid gap-1 items-center bg-white rounded-lg shadow p-8 mx-2"
            style={{ gridtemplateColumns: "20% 80%" }}
          >
            <h2 className="flex content-center col-span-2 text-xl leading-2 text-indigo-600 font-semibold tracking-wide uppercase">
              <div className="w-6 mx-3" onClick={handleFavorites}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    fill={`${isToggle ? "#fde047" : "#fff"}`}
                    stroke={`${isToggle ? "#fde047" : "#000"}`}
                    stroke-width="8"
                    d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"
                  />
                </svg>
              </div>
              <span className="text-xl text-indigo-600 font-semibold tracking-wide uppercase">
                {city.toUpperCase()}
              </span>
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
