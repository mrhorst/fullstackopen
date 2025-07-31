import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '000' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleInput = (e) => {
    e.preventDefault()
    if (e.target.name === 'name') {
      setNewName(e.target.value)
    } else if (e.target.name === 'phone') {
      setNewNumber(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isUnique(newName)) {
      setPersons([...persons, { name: newName, number: newNumber }])
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already present in the phonebook`)
    }
  }

  const isUnique = (name) => {
    return persons.find((p) => p.name !== name)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input name="name" onChange={handleInput} value={newName} />
        </div>
        <div>
          number:
          <input name="phone" onChange={handleInput} value={newNumber} />
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <p>
            {person.name} {person.number}
          </p>
        )
      })}
    </div>
  )
}

export default App
