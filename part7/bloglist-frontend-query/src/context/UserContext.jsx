import { useReducer, createContext } from 'react'

const initialState = { user: null, config: null }

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        config: action.payload.config,
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const loginUser = (user) => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }
    dispatch({ type: 'LOGIN', payload: { user, config } })
  }

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <UserContext.Provider
      value={{ user: state.user, config: state.config, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  )
}
