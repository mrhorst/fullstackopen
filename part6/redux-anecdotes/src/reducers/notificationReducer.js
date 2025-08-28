import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: null,
  message: '',
}
export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message
    },
    removeNotification(state, action) {
      state.message = ''
      state.type = null
    },
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
