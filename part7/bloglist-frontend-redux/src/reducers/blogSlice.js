import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  initialState,
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
      state[idx] = action.payload
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
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

export const deleteBlog = (blogToDelete, config) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blogToDelete.id, config)
    dispatch(removeBlog(blogToDelete))
  }
}

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions
export default blogSlice.reducer
