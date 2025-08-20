import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  })

  useEffect(() => {
    getBlogs()

    if (user === null) {
      const loggedUser = localStorage.getItem('loggedUser')
      if (loggedUser) {
        const user = JSON.parse(loggedUser)
        setUser(user)
      }
    }
  }, [])

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  const handleNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: null }), 2000)
  }

  return (
    <div>
      <div
        style={
          notification.message === null
            ? { display: 'none' }
            : { display: 'block' }
        }
      >
        <Notification message={notification.message} type={notification.type} />
      </div>
      {user === null ? (
        <div>
          <Login
            setUser={setUser}
            user={user}
            handleNotification={handleNotification}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>

          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>

          <Blog
            getBlogs={getBlogs}
            blogs={blogs}
            user={user}
            handleNotification={handleNotification}
          />
        </div>
      )}
    </div>
  )
}

export default App
