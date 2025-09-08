import { useEffect, useContext } from 'react'
import Notification from './components/Notification'
import User from './components/User'
import { UserContext } from './context/UserContext'
import Blog from './components/Blog'
import Login from './components/Login'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
  const { user, loginUser, logoutUser } = useContext(UserContext)

  useEffect(() => {
    if (user === null) {
      const loggedUserJSON = localStorage.getItem('loggedUser')

      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        loginUser(loggedUser)
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
          <Navbar />
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>
          <Routes>
            <Route path='/' element={<Blog />} />
            <Route path='/blogs' element={<Blog />} />
            <Route path='/users' element={<User />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
