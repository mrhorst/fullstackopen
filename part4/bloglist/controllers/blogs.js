const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/seed', async (request, response) => {
  const allBlogsStart = await Blog.find({})
  const users = await User.find({})
  const randomUser = users[Math.floor(Math.random() * users.length)]

  allBlogsStart.forEach(async (blog) => {
    if (!blog.user) {
      blog.user = randomUser._id
      console.log('Blog to be saved:', blog)
      await blog.save()
    } else {
      const userId = blog.user.toString()
      const user = await User.findById(userId)
      user.blogs.push(blog)
      await user.save()
    }
  })

  response.status(200).json({ status: 'OK' })
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.title) {
    response.status(400).send({ error: 'title is missing' })
  }

  if (!blog.url) {
    response.status(400).send({ error: 'url is missing' })
  }

  const users = await User.find({})
  const randomUser = users[Math.floor(Math.random() * users.length)]
  blog.user = randomUser._id

  const result = await blog.save()

  randomUser.notes = randomUser.notes.concat(result._id)
  await randomUser.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const blog = await Blog.findById(request.params.id)
  blog.likes = likes
  await blog.save()
  response.json(blog)
})

module.exports = blogsRouter
