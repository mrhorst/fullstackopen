import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const cleanState = []

const blogSlice = createSlice({
  initialState: cleanState,
  name: 'blogs',
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog, config) => {
  return async (dispatch) => {
    const createdBlog = await blogService.createBlog(blog, config)
    dispatch(appendBlog(createdBlog))
  }
}

export const { setBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer
