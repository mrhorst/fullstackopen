import { useState } from 'react'
import personService from './services/persons'
import { useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const getAllPersons = () => {
    personService.getAll().then((response) => setPersons(response))
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find((p) => p.id === id)
    try {
      alert(`Are you sure you want to delete ${personToDelete.name}?`)
      personService.deletePerson(personToDelete.id)
    } catch (e) {
      console.error(
        `Could not delete.\npersonToDelete: ${personToDelete}\n${e.message}`
      )
    }
  }

  useEffect(getAllPersons, [])

  const handleInput = (e) => {
    e.preventDefault()
    if (e.target.name === 'name') {
      setNewName(e.target.value)
    } else if (e.target.name === 'phone') {
      setNewNumber(e.target.value)
    } else if (e.target.name === 'filter') {
      setNewFilter(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isUnique(newName)) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString(),
      }
      setPersons([...persons, newPerson])
      personService.create(newPerson)
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already present in the phonebook`)
    }
  }

  const isUnique = (name) => {
    return persons.find((p) => p.name !== name)
  }

  const filteredPersons = (filter) => {
    return filter === ''
      ? persons
      : persons.filter(
          (p) =>
            p.name.toLowerCase().includes(filter.toLowerCase()) ||
            p.number.includes(filter)
        )
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleInput={handleInput} newFilter={newFilter} />
      <h3>add a new contact</h3>
      <PersonForm
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons(newFilter)}
        handleDelete={handleDelete}
      />
    </div>
  )
}

const PersonForm = ({ handleSubmit, handleInput, newName, newNumber }) => {
  return (
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
  )
}

const Filter = (props) => {
  return (
    <form>
      <div>
        filter shown with{' '}
        <input
          name="filter"
          onChange={props.handleInput}
          value={props.newFilter}
        />
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
      {props.persons.map((p) => (
        <li key={p.id}>
          {p.name} {p.number}{' '}
          <button onClick={() => props.handleDelete(p.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default App
