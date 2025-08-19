import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blogs, user, handleNotification }) => (
  <div>
    <AddBlog user={user} handleNotification={handleNotification} />
    {blogs.map((blog) => (
      <p key={blog.id}>
        Title:{blog.title} -{blog.author}
      </p>
    ))}
  </div>
)

const AddBlog = ({ user, handleNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (e) => {
    try {
      e.preventDefault()
      const blog = {
        title,
        author,
        url,
      }
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      }

      const addedBlog = await blogService.createBlog(blog, config)
      handleNotification(
        `new blog added: ${addedBlog.title} by ${addedBlog.author}`,
        'success'
      )
    } catch (e) {
      handleNotification(e.response.data.error, 'failure')
    }
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
