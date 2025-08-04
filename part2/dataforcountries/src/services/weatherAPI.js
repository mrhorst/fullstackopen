import axios from 'axios'

const API_KEY = import.meta.env.VITE_VC_API_KEY

const fetchWeather = (country, unit) => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?unitGroup=${unit}&key=${API_KEY}&contentType=json`
  return axios.get(url)
}

export default { fetchWeather }
