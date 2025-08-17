import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }, [])

  return user === null ? (
    <div>
      <Login setUser={setUser} />
    </div>
  ) : (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
