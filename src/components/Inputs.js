import React from "react";
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { useState } from "react";


export const Inputs = ({setQuery}) => {
  const [city, setCity] = useState('')

  const handleSearchClick = () => {
    if(city !== '') {
      setQuery({ q: city})
    }
  }

  const handleLocationClick = () => {
    // if you have permission to access user location
    if(navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(position => {

        let lat = position.coords.latitude
        let lon = position.coords.longitude

        setQuery({ lat, lon })
      })
    }
  }

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
        value={city}
        onChange={event => setCity(event.currentTarget.value)}
        type="text"
        className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        placeholder="Search for city..."
        />
        <UilSearch
        size={25}
        className="text-white cursor-pointer transition ease-out hover:scale-125"
        onClick={handleSearchClick}
        />
        <UilLocationPoint
        size={25}
        className="text-white cursor-pointer transition ease-out hover:scale-125"
        onClick={handleLocationClick}
        />
      </div>
    </div>
  )
}