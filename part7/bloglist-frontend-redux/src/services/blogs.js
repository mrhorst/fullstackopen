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

const updateLikes = async (blogToLike, config) => {
  const response = await axios.put(
    `${baseUrl}/${blogToLike.id}`,
    { ...blogToLike, likes: blogToLike.likes + 1 },
    config
  )
  return response.data
}

const deleteBlog = async (blogId, config) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

export default { getAll, createBlog, updateLikes, deleteBlog }
