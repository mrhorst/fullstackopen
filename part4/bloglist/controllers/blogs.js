const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.title) {
    response.status(400).send({ error: 'title is missing' })
  }

  if (!blog.url) {
    response.status(400).send({ error: 'url is missing' })
  }
  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
