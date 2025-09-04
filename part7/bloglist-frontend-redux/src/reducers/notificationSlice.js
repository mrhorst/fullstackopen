import { createSlice } from '@reduxjs/toolkit'

const cleanState = { message: '', type: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState: cleanState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return cleanState
    },
  },
})

export default notificationSlice.reducer

export const { setNotification, clearNotification } = notificationSlice.actions
