import React from "react";
import { iconURLFromCode } from "../services/weatherService";



export const Forecast = ({title, forecastObjectArray}) => {



  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>

      <hr className="my-2"/>

      <div className="flex flex-row items-center justify-between text-white">

        {
          forecastObjectArray.map(object => (
            <div key={object.title} className="flex flex-col items-center justify-center">
              <p className="font-light text-sm">{object.title}</p>
              <img src={iconURLFromCode(object.icon)} alt="" className="w-12 my-1"/>
              <p className="font-medium">{`${object.temp.toFixed()}°`}</p>
            </div>
          ))
        }

      </div>
    </div>
  )
}