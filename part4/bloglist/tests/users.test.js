const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe("when there's only the 'root' user in the database", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('username must be at least 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      username: 'ro',
      password: 'secret',
    }
    const response = await api.post('/api/users').send(user).expect(400)
    const usersAtEnd = await helper.usersInDb()

    assert(
      response.body.error.includes('shorter than the minimum allowed length')
    )
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

test('password must be at least 3 characters long', async () => {
  const usersAtStart = await helper.usersInDb()
  const user = {
    username: 'roo',
    password: 'se',
  }
  const response = await api.post('/api/users').send(user).expect(400)
  const usersAtEnd = await helper.usersInDb()

  assert(
    response.body.error.includes('password minimum length is 3 characters')
  )
  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

after(() => {
  mongoose.connection.close()
})
