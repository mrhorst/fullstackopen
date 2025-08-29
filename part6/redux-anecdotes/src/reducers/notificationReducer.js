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
      state.message = action.payload
    },
    clearNotification(state, action) {
      state.message = ''
      state.type = null
    },
  },
})

export const showNotification = ({ message }, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => dispatch(clearNotification()), seconds * 1000)
  }
}

export const { clearNotification, setNotification } = notificationSlice.actions
export default notificationSlice.reducer
