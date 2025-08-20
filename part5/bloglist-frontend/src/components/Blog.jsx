import { useState } from 'react'
import { useRef } from 'react'
import blogService from '../services/blogs'
import Toggable from './Toggable'

const Blog = ({ getBlogs, blogs, user, handleNotification }) => {
  const blogFormRef = useRef()

  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }

  const handleLike = async (e) => {
    try {
      const blogId = e.target.parentElement.parentElement.parentElement.id
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
      <Toggable
        ref={blogFormRef}
        hideLabel={'hide form'}
        showLabel={'show form'}
      >
        <AddBlog
          blogFormRef={blogFormRef}
          config={config}
          handleNotification={handleNotification}
        />
      </Toggable>
      {blogs.map((blog) => (
        <div
          style={{ border: '1px solid', padding: '5px', margin: '5px 0 5px 0' }}
          key={blog.id}
          id={blog.id}
        >
          Title:{blog.title} -{blog.author}
          <Toggable showLabel={'show info'} hideLabel={'hide info'}>
            <div>URL: {blog.url}</div>
            <div>Likes: {blog.likes}</div>
            <div>User: {blog.user.name}</div>
            <button onClick={handleLike}>like</button>
          </Toggable>
        </div>
      ))}
    </div>
  )
}

const AddBlog = ({ config, handleNotification, blogFormRef }) => {
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

      const addedBlog = await blogService.createBlog(blog, config)
      handleNotification(
        `new blog added: ${addedBlog.title} by ${addedBlog.author}`,
        'success'
      )
      blogFormRef.current.toggleVisibility()
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
