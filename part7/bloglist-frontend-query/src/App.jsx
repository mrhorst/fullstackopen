import { useEffect, useContext } from 'react'
import Notification from './components/Notification'
import { Users, User } from './components/User'
import { UserContext } from './context/UserContext'
import { Blogs, Blog } from './components/Blog'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
  const { user, loginUser } = useContext(UserContext)

  useEffect(() => {
    if (user === null) {
      const loggedUserJSON = localStorage.getItem('loggedUser')

      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        loginUser(loggedUser)
      }
    }
  }, [user, loginUser])

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
          <Routes>
            <Route path='/' element={<Blogs />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blog/:id' element={<Blog />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
