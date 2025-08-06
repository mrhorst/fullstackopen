require('dotenv').config()
const mongoose = require('mongoose')
const Person = require('./models/person')

const seedEntries = [
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
    number: '39-23-6423125',
  },
]

Person.find({}).then((persons) => {
  if (persons.length === 0) {
    seed()
  } else {
    console.log('DB is not empty. Seeding aborted.')
    mongoose.connection.close()
  }
})

const seed = () => {
  seedEntries.forEach((person) => {
    const { name, number } = person
    const newPerson = new Person({ name, number })
    newPerson
      .save()
      .then((savedPerson) => {
        return savedPerson
          ? console.log(`${savedPerson.name} saved successfully.`)
          : console.log('error')
      })
      .finally(() => mongoose.connection.close())
  })
}
