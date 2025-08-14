const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = new Blog(request.body)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken) {
    return response.status(401).json({ error: 'invalid token' })
  }
  const user = await User.findById(decodedToken.id)
  console.log(user)

  if (!body.title) {
    response.status(400).send({ error: 'title is missing' })
  }

  if (!body.url) {
    response.status(400).send({ error: 'url is missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const blogOwner = blog.user._id.toString()
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    console.log('BLOG OWNER:', blogOwner)
    console.log('DECODED TOKEN:', decodedToken)

    if (blogOwner !== decodedToken.id) {
      return response
        .status(403)
        .json({ error: 'you do not own this resource' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (e) {
    next(e)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const blog = await Blog.findById(request.params.id)
  blog.likes = likes
  await blog.save()
  response.json(blog)
})

module.exports = blogsRouter
