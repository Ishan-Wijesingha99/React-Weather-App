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
  const [query, setQuery] = useState({ q: 'Sydney' })
  const units = 'metric'
  const [weatherObject, setWeatherObject] = useState(null)

  useEffect(() => {

    const getWeatherData = async () => {
      const message = query.q ? query.q : 'current location.'


      await getFormattedWeatherData({...query, units})
      .then(data => setWeatherObject(data))
    }

    getWeatherData()

  }, [query])

  const formatBackground = () => {
    // if weather object is null, return this background colour
    if(!weatherObject) return

    if(weatherObject.temp >= 30) return 'from-red-600 to-orange-800'
    if(weatherObject.temp < 30 && weatherObject.temp >= 20) return 'from-orange-700 to-amber-800'
    if(weatherObject.temp < 20 && weatherObject.temp >= 10) return 'from-cyan-700 to-blue-700'
    if(weatherObject.temp < 10 && weatherObject.temp >= 5) return 'from-blue-400 to-sky-600'
    if(weatherObject.temp < 5) return 'from-slate-300 to-slate-500 '
  }



  return (
    <div className={`mx-auto max-w-screen-md mt-5 py-5 px-32 bg-gradient-to-br shadow-gray-400 ${formatBackground()}`}>

      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery}/>

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