import blogService from './services/blogs'
import loginService from './services/login'

export const getBlogs = async () => {
  const response = await blogService.getAll()
  return [...response].sort((a, b) => b.likes - a.likes)
}

export const createBlog = async (blog, config) => {
  const response = await blogService.createBlog(blog, config)
  return response
}

export const login = async (credentials, config) => {
  const response = await loginService.login(credentials)
  response.config = config
  return response
}

export const deleteBlog = async ({ blog, config }) => {
  const response = await blogService.deleteBlog(blog.id, config)
  return response
}

export const likeBlog = async ({ blog, config }) => {
  const blogToLike = { ...blog, likes: blog.likes + 1 }
  const response = await blogService.updateLikes(blogToLike, config)
  return response
}
