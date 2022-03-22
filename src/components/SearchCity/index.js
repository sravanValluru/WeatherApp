import React, { useRef } from "react";

export default function SearchCity({ setCity }) {
  const cityRef = useRef();
  const handleCity = (e) => {
    e.preventDefault();
    setCity(cityRef.current.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCity(e);
    }
  };

  return (
    <div className="mt-8 sm:flex">
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <input
        id="city"
        name="city"
        type="text"
        ref={cityRef}
        required
        className="w-full px-5 py-3 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs border-gray-300 rounded-md"
        style={{ border: "2px solid rgb(209 213 219)" }}
        placeholder="Enter city name"
        onKeyPress={handleKeyPress}
      />
      <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
        <button
          type="submit"
          className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleCity}
        >
          Howz the weather today?
        </button>
      </div>
    </div>
  );
}
