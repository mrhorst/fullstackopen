import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const initialState = null

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    authenticateUser(state, action) {
      return action.payload
    },
    logoutUser(state, action) {
      return null
    },
  },
})

export const login = (credentials, handleNotification) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      user.config = {
        headers: { Authorization: `Bearer ${user.token}` },
      }

      dispatch(authenticateUser(user))
      handleNotification(`Welcome, ${user.name}!`, 'success')
      return user
    } catch (e) {
      handleNotification(e.response.data.error, 'failure')
    }
  }
}

export const authFromLocalStorage = () => {
  return async (dispatch) => {
    const loggedUser = localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      user.config = {
        headers: { Authorization: `Bearer ${user.token}` },
      }
      dispatch(authenticateUser(user))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutUser())
  }
}

export const { authenticateUser, logoutUser } = userSlice.actions
export default userSlice.reducer
