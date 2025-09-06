import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [config, setConfig] = useState(null)

  useEffect(() => {
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

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)

    setBlogs(blogs)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
    setConfig(null)
  }

  const handleLike = async (blogId) => {
    try {
      const blog = blogs.find((b) => b.id === blogId)
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.updateLikes(blogId, updatedBlog, config)
      getBlogs()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <Notification />

      {user === null ? (
        <div>
          <Login setUser={setUser} setConfig={setConfig} user={user} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>

          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>

          <Blog user={user} config={config} handleLike={handleLike} />
        </div>
      )}
    </div>
  )
}

export default App
