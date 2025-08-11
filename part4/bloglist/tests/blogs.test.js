const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const api = supertest(app)

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const listWithOneBlog = [
  {
    title: 'test with one blog',
    author: 'Mr. Test',
    url: 'someurl.com',
    likes: 2,
  },
]

const listWithFiveBlogs = [
  {
    title: 'First blog',
    author: 'Alice',
    url: 'aliceblog.com',
    likes: 5,
  },
  {
    title: 'Second blog',
    author: 'Bob',
    url: 'bobblog.com',
    likes: 10,
  },
  {
    title: 'Third blog',
    author: 'Charlie',
    url: 'charlieblog.com',
    likes: 3,
  },
  {
    title: 'Fourth blog',
    author: 'Dana',
    url: 'danablog.com',
    likes: 7,
  },
  {
    title: 'Fifth blog',
    author: 'Eve',
    url: 'eveblog.com',
    likes: 1,
  },
]

test('when list has one blog with 2 likes, return 2', () => {
  const result = listHelper.totalLikes(listWithOneBlog)
  assert.strictEqual(result, 2)
})

test('when list has 5 blogs with total of 26 likes, return 26', () => {
  const result = listHelper.totalLikes(listWithFiveBlogs)
  assert.strictEqual(result, 26)
})

test('return the favorite blog, which is the one with most likes (second blog with 10 likes', () => {
  const result = listHelper.favoriteBlog(listWithFiveBlogs)
  assert.deepStrictEqual(result, listWithFiveBlogs[1])
})

test('return 0 if list of blogs is empty', () => {
  const result = listHelper.favoriteBlog([])
  assert.deepStrictEqual(result, 0)
})

test('return the least favorite blog', () => {
  const result = listHelper.leastFavorite(listWithFiveBlogs)
  assert.deepStrictEqual(result, listWithFiveBlogs[4])
})

test('GET returns the correct amount of blog posts', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, 1)
})

test('prop id is the unique identifier for blogs', async () => {
  const response = await api.get('/api/blogs').expect(200)

  const blog = response.body[0]

  assert.ok('id' in blog, 'id NOT present in blogs')
  assert.ok(!('_id' in blog), '_id IS present in blog')
})

after(async () => {
  await mongoose.connection.close()
})
