import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import {
  setNotification,
  clearNotification,
} from './reducers/notificationSlice'
import { initializeBlogs } from './reducers/blogSlice'
import { authFromLocalStorage, logout } from './reducers/userSlice'

const App = () => {
  const user = useSelector((state) => state.user)

  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())

    if (user === null) {
      dispatch(authFromLocalStorage())
    }
  }, [user])

  const logoutUser = () => {
    localStorage.clear()
    dispatch(logout())
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
          <Login handleNotification={handleNotification} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>

          <p>
            {user.name} logged in <button onClick={logoutUser}>logout</button>
          </p>

          <Blog handleNotification={handleNotification} />
        </div>
      )}
    </div>
  )
}

export default App
