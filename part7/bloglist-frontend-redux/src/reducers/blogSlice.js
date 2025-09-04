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
    updateBlog(state, action) {
      const idx = state.findIndex((b) => b.id === action.payload.id)
      console.log(action.payload)
      state[idx] = action.payload
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

export const likeBlog = (blogToLike, config) => {
  return async (dispatch) => {
    const likedBlog = await blogService.updateLikes(blogToLike, config)
    likedBlog.user = { ...blogToLike.user }
    dispatch(updateBlog(likedBlog))
  }
}

export const { setBlogs, appendBlog, updateBlog } = blogSlice.actions
export default blogSlice.reducer
