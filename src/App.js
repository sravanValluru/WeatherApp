import { useEffect, useState } from "react";
import SearchCity from "./components/SearchCity";
import CurrentWeather from "./components/CurrentWeather";
import ForecastWeather from "./components/ForecastWeather";
import AirPollution from "./components/AirPollution";
import Favorites from "./components/Favorites";

const api = {
  key: "67750f6daace7049e45faba8b8e6bcb6",
  base: "https://api.openweathermap.org/data/2.5/weather",
  baseForecast: "https://api.openweathermap.org/data/2.5/forecast",
  baseGeo: "http://api.openweathermap.org/geo/1.0/direct",
  baseAirPollution: "http://api.openweathermap.org/data/2.5/air_pollution",
};

function App() {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    console.log("App: useEffect");
    if (city.length > 1) {
      fetch(`${api.baseGeo}?q=${city}&appid=${api.key}&q=${city}&limit=5`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Geolaction: data for city", data);
          if (data.length == 0) {
            console.log("Geolaction: data for city length 0");
            setLatitude(0);
            setLongitude(0);
          } else {
            setLatitude(data[0].lat);
            setLongitude(data[0].lon);
            console.log(data);
          }
        })
        .catch((err) => console.log("Geolaction: data for city", err));
    }
  }, [city]);

  return (
    <div className="relative mx-auto px-4 py-16 flex flex-col place-items-center mx-12 md:mx-20">
      <div className="text-5xl text-indigo-600" style={{ fontWeight: 900 }}>
        Weather App
      </div>
      <SearchCity setCity={setCity} />
      <Favorites favorites={favorites} />
      <div className="flex lg:flex-row flex-col w-full place-content-between lg:place-content-evenly">
        {city && (
          <CurrentWeather
            favorites={favorites}
            setFavorites={setFavorites}
            city={city}
            base={api.base}
            apiKey={api.key}
          />
        )}
        {latitude != 0 && longitude != 0 && (
          <AirPollution
            base={api.baseAirPollution}
            latitude={latitude}
            longitude={longitude}
            apiKey={api.key}
          />
        )}
      </div>

      {city && (
        <ForecastWeather city={city} base={api.baseForecast} apiKey={api.key} />
      )}
    </div>
  );
}

export default App;
