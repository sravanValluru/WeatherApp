import React, { useState, useEffect } from "react";

export default function AirPollution({ apiKey, base, latitude, longitude }) {
  const [airPollutionInfo, setAirPollutionInfo] = useState({});

  useEffect(() => {
    console.log("AirPollution: useEffect");
    fetch(`${base}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("AirPollution: data", data);
        setAirPollutionInfo(data);
      })
      .catch((err) => console.log("AirPollution: data", err));
  }, [latitude, longitude, base, apiKey]);

  return (
    <>
      {Object.keys(airPollutionInfo).length > 0 && (
        <div
          className="grid gap-1 grid-cols-2 items-center bg-white rounded-lg shadow py-8 px-12 my-12 mx-2"
          style={{ gridtemplateColumns: "40% 60%" }}
        >
          <h2 className="col-span-2 text-xl text-center leading-2 text-indigo-600 font-semibold tracking-wide uppercase">
            Air Quality Index:{" "}
            <span className="text-slate-900">
              {airPollutionInfo.list[0].main.aqi}
            </span>
          </h2>
          {/* <h2 className="col-span-1 text-xl leading-2 text-slate-900 font-semibold tracking-wide uppercase pl-2">
            {airPollutionInfo.list[0].main.aqi}
          </h2> */}
          <h2 className="col-span-1 text-right text-md leading-2 text-slate-700 font-semibold tracking-wide uppercase">
            CO:
          </h2>
          <h2 className="col-span-1 text-md leading-2 text-slate-700 font-semibold tracking-wide uppercase pl-2">
            {airPollutionInfo.list[0].components.co}
          </h2>
          <h2 className="col-span-1 text-right text-md leading-2 text-slate-700 font-semibold tracking-wide uppercase">
            O3:
          </h2>
          <h2 className="col-span-1 text-md leading-2 text-slate-700 font-semibold tracking-wide uppercase pl-2">
            {airPollutionInfo.list[0].components.o3}
          </h2>
          <h2 className="col-span-1 text-right text-md leading-2 text-slate-700 font-semibold tracking-wide uppercase">
            SO2:
          </h2>
          <h2 className="col-span-1 text-md leading-2 text-slate-700 font-semibold tracking-wide uppercase pl-2">
            {airPollutionInfo.list[0].components.so2}
          </h2>
          <h2 className="col-span-1 text-right text-md leading-2 text-slate-700 font-semibold tracking-wide uppercase">
            NH3:
          </h2>
          <h2 className="col-span-1 text-md leading-2 text-slate-700 font-semibold tracking-wide uppercase pl-2">
            {airPollutionInfo.list[0].components.nh3}
          </h2>
          <h2 className="col-span-1 text-right text-md leading-2 text-slate-700 font-semibold tracking-wide uppercase">
            PM10:
          </h2>
          <h2 className="col-span-1 text-md leading-2 text-slate-700 font-semibold tracking-wide uppercase pl-2">
            {airPollutionInfo.list[0].components.pm10}
          </h2>
        </div>
      )}
    </>
  );
}
