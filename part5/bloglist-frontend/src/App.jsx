import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user === null) {
      const loggedUser = localStorage.getItem('loggedUser')
      if (loggedUser) {
        const user = JSON.parse(loggedUser)
        setUser(user)
      }
    }
  }, [])

  useEffect(() => {
    getAllBlogs()
  }, [])

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const addUserToLocalStorage = () => {
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
  }
  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  return user === null ? (
    <div>
      <Login setUser={setUser} user={user} />
    </div>
  ) : (
    <div>
      <h2>blogs</h2>

      <p>
        {user.name} logged in <button onClick={logout}>logout</button>
      </p>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
