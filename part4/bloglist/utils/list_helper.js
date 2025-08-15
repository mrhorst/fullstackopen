const User = require('../models/user')
const Blog = require('../models/blog')

const dummy = (blogs) => {
  return 1
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => {
    acc += cur.likes
    return acc
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, cur) => {
    acc = acc.likes > cur.likes ? acc : cur
    return acc
  }, 0)
}

const leastFavorite = (blogs) => {
  return blogs.reduce((acc, cur) => (acc.likes < cur.likes ? acc : cur), 0)
}

/** Users */

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  leastFavorite,
  usersInDb,
  blogsInDb,
}
