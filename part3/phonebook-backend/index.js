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
  Person.findByIdAndDelete(req.params.id).then((person) => {
    console.log(`deleted ${person}`)
    res.status(204).end()
  })
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({
      error: 'content missing',
    })
  }

  const person = new Person({ name, number })

  person.save().then((savedPerson) => res.json(savedPerson))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { number } = request.body
  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.number = number

      person.save().then((savedPerson) => {
        response.json(savedPerson)
      })
    })
    .catch((error) => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(`Error: ${error.message}`)

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})
