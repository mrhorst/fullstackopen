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

export const createBlog = (blog, config, handleNotification) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.createBlog(blog, config)

      dispatch(appendBlog(createdBlog))
      handleNotification(
        `new blog added: ${blog.title} by ${blog.author}`,
        'success'
      )
    } catch (e) {
      handleNotification(`could not create blog: ${blog.title}.`, 'error')
    }
  }
}

export const likeBlog = (blogToLike, config) => {
  return async (dispatch) => {
    const likedBlog = await blogService.updateLikes(blogToLike, config)
    likedBlog.user = { ...blogToLike.user }
    dispatch(updateBlog(likedBlog))
  }
}

export const deleteBlog = (blogToDelete, config, handleNotification) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blogToDelete.id, config)
      dispatch(removeBlog(blogToDelete))
      handleNotification(
        `blog ${blogToDelete.title} deleted successfully`,
        'success'
      )
      console.log()
    } catch (e) {
      handleNotification(e.response.data.error, 'error')
    }
  }
}

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions
export default blogSlice.reducer
