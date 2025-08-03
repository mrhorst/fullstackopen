import { useEffect, useState } from 'react'
import countriesService from './services/countries'

function App() {
  const [countries, setCountries] = useState(null)
  const [input, setInput] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState(null)

  useEffect(() => {
    countriesService.getAll().then((r) => setCountries(r.data))
  }, [])

  useEffect(() => {
    if (input !== null && input.length > 0) {
      const newList = countries.filter((country) =>
        country.name.common.toLowerCase().includes(input)
      )
      setFilteredCountries([...newList])
      console.log(filteredCountries)
    } else {
      setFilteredCountries(null)
    }
  }, [input])

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
                <li>{language}</li>
              ))}
            </ul>
            <img src={filteredCountries[0].flags.png} />
          </>
        ) : filteredCountries.length <= 10 ? (
          filteredCountries.map((country, idx) => {
            return (
              <ul>
                <li key={idx}>{country.name.official}</li>
              </ul>
            )
          })
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
