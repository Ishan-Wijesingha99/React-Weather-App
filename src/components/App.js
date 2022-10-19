import React from "react";
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import { TopButtons } from "./TopButtons";
import { Inputs } from "./Inputs";
import { TimeAndLocation } from "./TimeAndLocation";
import { TemperatureAndDetails } from "./TemperatureAndDetails";
import { Forecast } from "./Forecast";
import { getFormattedWeatherData } from "../services/weatherService";
import { useState } from "react";
import { useEffect } from "react";


export const App = () => {

  // this is the state for the location change
  const [query, setQuery] = useState({ q: 'Toronto' })
  // this is the state for a change in units
  const [units, setUnits] = useState('metric')
  const [weatherObject, setWeatherObject] = useState(null)

  useEffect(() => {

    const getWeatherData = async () => {
      await getFormattedWeatherData({...query, units})
      .then(data => setWeatherObject(data))
    }

    getWeatherData()

  }, [query, units])

 

  return (
    <div className="mx-auto max-w-screen-md mt-5 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">

      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

      {weatherObject && (
        <div>
          <TimeAndLocation weatherObject={weatherObject}/>
          <TemperatureAndDetails weatherObject={weatherObject}/>
          <Forecast title="hourly forecast" forecastObjectArray={weatherObject.hourly}/>
          <Forecast title="daily forecast" forecastObjectArray={weatherObject.daily}/>
        </div>
      )}

    </div>
  )
}