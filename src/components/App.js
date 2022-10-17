import React from "react";
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import { TopButtons } from "./TopButtons";
import { Inputs } from "./Inputs";
import { TimeAndLocation } from "./TimeAndLocation";
import { TemperatureAndDetails } from "./TemperatureAndDetails";
import { Forecast } from "./Forecast";


export const App = () => {
  return (
    <div className="mx-auto max-w-screen-md mt-5 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButtons />
      <Inputs />
      <TimeAndLocation />
      <TemperatureAndDetails />
      <Forecast title="hourly forecast"/>
      <Forecast title="daily forecast"/>
    </div>
  )
}