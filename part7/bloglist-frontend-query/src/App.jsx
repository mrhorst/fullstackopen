import { useEffect, useContext } from 'react'
import Notification from './components/Notification'
import { UserContext } from './context/UserContext'
import Blog from './components/Blog'
import Login from './components/Login'

const App = () => {
  const { user, loginUser, logoutUser } = useContext(UserContext)

  useEffect(() => {
    if (user === null) {
      const loggedUserJSON = localStorage.getItem('loggedUser')

      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        loginUser({ user: loggedUser })
      }
    }
  }, [user, loginUser])

  const logout = () => {
    localStorage.removeItem('loggedUser')
    logoutUser()
  }

  return (
    <div>
      <Notification />
      {user === null ? (
        <div>
          <Login />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>
          <Blog />
        </div>
      )}
    </div>
  )
}

export default App
