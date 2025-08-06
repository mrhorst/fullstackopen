require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('tony', (req, res) => {
  return JSON.stringify(req.body)
})

const tony =
  ':method :url :status :res[content-length] - :response-time ms :tony'
app.use(morgan(tony))

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => res.json(persons))
})

app.get('/info', (req, res) => {
  const numPersons = entries.length
  const now = new Date().toUTCString()
  res.send(`<p>Phonebook has info for ${numPersons} people</p><p>${now}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findById(request.params.id).then((person) => response.json(person))
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const persons = entries.filter((person) => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({
      error: 'content missing',
    })
  }

  const isNamePresent = entries.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  )

  if (isNamePresent) {
    return res.status(409).json({
      error: 'name already exists.',
    })
  }

  const person = new Person({ name, number })

  person.save().then((savedPerson) => res.json(savedPerson))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})
