import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blogs, user }) => (
  <div>
    <AddBlog user={user} />
    {blogs.map((blog) => (
      <p key={blog.id}>
        Title:{blog.title} -{blog.author}
      </p>
    ))}
  </div>
)

const AddBlog = ({ user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (e) => {
    e.preventDefault()
    const blog = {
      title,
      author,
      url,
    }
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }

    await blogService.createBlog(blog, config)
  }
  return (
    <div>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          author:
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url:
          <input value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button>add blog</button>
      </form>
    </div>
  )
}

export default Blog
