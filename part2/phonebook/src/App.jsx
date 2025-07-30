import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const handleInput = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isUnique(newName)) {
      setPersons([...persons, { name: newName }])
      setNewName('')
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
          name: <input onChange={handleInput} value={newName} />
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    </div>
  )
}

export default App
