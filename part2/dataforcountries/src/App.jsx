import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weatherAPI'

function App() {
  const [countries, setCountries] = useState(null)
  const [input, setInput] = useState('')
  const [filteredCountries, setFilteredCountries] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countriesService.getAll().then((r) => setCountries(r.data))
  }, [])

  useEffect(() => {
    if (input && countries && input.length > 0) {
      const newList = countries.filter((country) =>
        country.name.common.toLowerCase().includes(input.toLowerCase())
      )

      setFilteredCountries([...newList])
    } else {
      setFilteredCountries(null)
    }
  }, [input, countries])

  useEffect(() => {
    if (filteredCountries && filteredCountries.length === 1) {
      const capital = filteredCountries[0].capital[0]
      handleWeather(capital)
    } else {
      setWeather(null)
    }
  }, [filteredCountries])

  const handleWeather = (capital) => {
    weatherService
      .fetchWeather(capital, 'metric')
      .then((r) => setWeather(r.data))
      .catch((e) => {
        console.error(e)
        setWeather(null)
      })
  }

  return (
    <>
      <form>
        find countries <input onChange={(e) => setInput(e.target.value)} />
      </form>
      {filteredCountries !== null ? (
        filteredCountries.length === 1 ? (
          <>
            <h1>{filteredCountries[0].name.common}</h1>
            <p>Capital {filteredCountries[0].capital[0]}</p>
            <p>Area {filteredCountries[0].area}</p>
            <h2>Languages</h2>
            <ul>
              {Object.values(filteredCountries[0].languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={filteredCountries[0].flags.png} />
            <h2>Weather in {filteredCountries[0].capital[0]}</h2>
            {weather ? (
              <>
                <p>Temperature is {weather.currentConditions.temp} Celsius</p>
                <img
                  src={`/assets/icons/${weather.currentConditions.icon}.svg`}
                  style={{ width: '150px', height: 'auto' }}
                />
                <p>Wind {weather.currentConditions.windspeed} m/s</p>
              </>
            ) : (
              <p>Loading weather...</p>
            )}
          </>
        ) : filteredCountries.length <= 10 ? (
          <ul>
            {filteredCountries.map((country) => {
              return (
                <li key={country.name.official}>
                  {country.name.official}{' '}
                  <button onClick={() => setInput(country.name.common)}>
                    Show
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <p>too many matches. specify another filter</p>
        )
      ) : (
        <p>please enter a query</p>
      )}
    </>
  )
}

export default App
