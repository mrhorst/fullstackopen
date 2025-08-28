import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: null,
  message: 'Hello',
}
export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
})

export default notificationSlice.reducer
