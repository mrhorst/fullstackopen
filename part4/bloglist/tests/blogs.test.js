const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

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
