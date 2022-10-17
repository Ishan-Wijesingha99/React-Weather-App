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

export const getFormattedWeatherData = async (searchParams) => {
  const finaData = await getWeatherData('weather', searchParams)
  .then(data => formatAPIData(data))

  return finaData
}
