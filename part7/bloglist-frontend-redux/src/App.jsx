import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import {
  setNotification,
  clearNotification,
} from './reducers/notificationSlice'
import { initializeBlogs } from './reducers/blogSlice'

const App = () => {
  const [user, setUser] = useState(null)
  const [config, setConfig] = useState(null)

  const blogs = useSelector((state) => state.blogs)
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())

    if (user === null) {
      const loggedUser = localStorage.getItem('loggedUser')
      if (loggedUser) {
        const user = JSON.parse(loggedUser)
        setUser(user)
        setConfig({
          headers: { Authorization: `Bearer ${user.token}` },
        })
      }
    }
  }, [user])

  const logout = () => {
    localStorage.clear()
    setUser(null)
    setConfig(null)
  }

  const handleNotification = (message, type) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => dispatch(clearNotification()), 2000)
  }

  return (
    <div>
      <div
        style={
          notification.message === ''
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
            setConfig={setConfig}
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
            blogs={blogs}
            user={user}
            config={config}
            handleNotification={handleNotification}
          />
        </div>
      )}
    </div>
  )
}

export default App
