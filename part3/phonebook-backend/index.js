const express = require('express')

const app = express()
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

const entries = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/api/persons', (req, res) => {
  res.json(entries)
})

app.get('/info', (req, res) => {
  const numPersons = entries.length
  const now = new Date().toUTCString()
  res.send(`<p>Phonebook has info for ${numPersons} people</p><p>${now}</p>`)
})
