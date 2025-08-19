import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog, config) => {
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

export default { getAll, createBlog }
