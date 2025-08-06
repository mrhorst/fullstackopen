const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'you probably called it wrong. need to be "node <file> <password> <name> <number>" where <name> and <number> are optional. Call with 3 or 5 args.'
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fso25:${password}@cluster0.eufjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name,
    number,
  })

  person.save().then((result) => {
    console.log('person saved!\n', result)
    mongoose.connection.close()
  })
}
