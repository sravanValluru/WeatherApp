import React, { useState } from "react";

export default function Favorites({ favorites, setCity }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  return (
    <div className="absolute top-2 right-2 md:right-6 md:top-15 z-20">
      <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
        <button
          type="submit"
          className="w-full text-white flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          onClick={handleClick}
        >
          Favorite Cities ({favorites.length})
        </button>
      </div>
      <div className={` ${!isVisible ? "hidden" : ""}`}>
        {favorites.length > 0 &&
          favorites.map((city) => (
            <div
              key={city}
              className="cursor-pointer bg-white text-slate-900 mt-3 p-2 text-center shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0"
              onClick={() => setCity(city)}
            >
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </div>
          ))}
      </div>
    </div>
  );
}
