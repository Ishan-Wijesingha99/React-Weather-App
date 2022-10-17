import { DateTime } from "luxon"

const API_KEY = '4fc12e65f380d2f8baa32f2afa5edaba'
const BASE_URL = "https://api.openweathermap.org/data/2.5"



// function that fetches the data
const getWeatherData = (endingURL, searchParams) => {
  // URL constructor function just returns a URL string
  const url = new URL(BASE_URL + "/" + endingURL)
  
  url.search = new URLSearchParams({
    ...searchParams,
    appId: API_KEY
  })

  return fetch(url).then(res => res.json())
}

const formatAPIData = (data) => {
  const {
    coord: {lat, lon},
    main: {temp, feels_like, temp_min, temp_max, humidity},
    name,
    dt,
    sys: {country, sunrise, sunset},
    weather,
    wind: {speed}
  } = data

  const { main: details, icon } = weather[0] 

  return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed}
}

const formatForecastData = data => {
  let { timezone, daily, hourly } = data

  daily = daily.slice(1, 6).map(object => {
    return {
      title: formatToLocalTime(object.dt, timezone, 'ccc'),
      temp: object.temp.day,
      icon: object.weather[0].icon
    }
  })

  hourly = hourly.slice(1, 6).map(object => {
    return {
      title: formatToLocalTime(object.dt, timezone, 'hh:mm a'),
      temp: object.temp.day,
      icon: object.weather[0].icon
    }
  })

  return {timezone, daily, hourly}
}

export const getFormattedWeatherData = async (searchParams) => {
  const finalData = await getWeatherData('weather', searchParams)
  .then(data => formatAPIData(data))

  const {lat, lon} = finalData

  const forecastData = await getWeatherData('onecall', {
    lat,
    lon,
    exclude: 'current,minutely,alerts',
    units: searchParams.units
  }).then(data => formatForecastData(data))

  return {...finalData, ...forecastData}
}

export const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

export const iconURLFromCode = iconCode => `http://openweathermap.org/img/wn/${iconCode}@2x.png`