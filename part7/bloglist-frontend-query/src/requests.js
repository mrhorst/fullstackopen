import blogService from './services/blogs'
import loginService from './services/login'

export const getBlogs = async () => {
  const response = await blogService.getAll()
  return response
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
