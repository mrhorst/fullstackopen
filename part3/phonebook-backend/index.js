require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('tony', (request, response) => {
  return JSON.stringify(request.body)
})

const tony =
  ':method :url :status :res[content-length] - :response-time ms :tony'
app.use(morgan(tony))

app.get('/api/persons', (request, respons) => {
  Person.find({}).then((persons) => respons.json(persons))
})

app.get('/info', (request, respons) => {
  const numPersons = entries.length
  const now = new Date().toUTCString()
  respons.send(
    `<p>Phonebook has info for ${numPersons} people</p><p>${now}</p>`
  )
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(request.params.id)
    .then((person) => response.json(person))
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, respons) => {
  Person.findByIdAndDelete(request.params.id).then((person) => {
    console.log(`deleted ${person}`)
    response.status(204).end()
  })
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const person = new Person({ name, number })

  person.save().then((savedPerson) => response.json(savedPerson))
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

const errorHandler = (error, request, response, next) => {
  console.error(`Error: ${error.message}`)

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})
