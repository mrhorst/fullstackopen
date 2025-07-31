import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      <form>
        <div>
          filter shown with{' '}
          <input name="filter" onChange={handleInput} value={newFilter} />
        </div>
      </form>
      <h2>add a new contact</h2>
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
      <Persons persons={filteredPersons(newFilter)} />
    </div>
  )
}

const Persons = (props) => {
  return (
    <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
      {props.persons.map((p) => (
        <li key={p.id}>
          <p>
            {p.name} {p.number}
          </p>
        </li>
      ))}
    </ul>
  )
}

export default App
