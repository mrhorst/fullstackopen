import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async ({ blog, config }) => {
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateLikes = async (updatedBlog, config) => {
  const response = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  )
  return response.data
}

const deleteBlog = async (blogId, config) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const commentBlog = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, comment)
  return response
}

const getBlog = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}`)
  return response
}
export default {
  getAll,
  createBlog,
  updateLikes,
  deleteBlog,
  commentBlog,
  getBlog,
}
