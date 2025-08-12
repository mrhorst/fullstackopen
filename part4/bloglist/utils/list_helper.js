const User = require('../models/user')

const dummy = (blogs) => {
  return 1
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
  return users
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  leastFavorite,
  usersInDb,
}
