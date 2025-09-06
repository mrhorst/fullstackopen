import { createContext, useReducer } from 'react'

const initialState = { message: null, type: null }

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, initialState)

  const showNotification = (message, type, duration = 2000) => {
    dispatch({ type: 'SHOW', payload: { message, type } })
    setTimeout(() => dispatch({ type: 'CLEAR' }), duration)
  }

  return (
    <NotificationContext.Provider
      value={{ notification, dispatch, showNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
