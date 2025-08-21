import { useState } from 'react'
import { useRef } from 'react'
import blogService from '../services/blogs'
import Toggable from './Toggable'
import PropTypes from 'prop-types'

const Blog = ({ getBlogs, blogs, user, handleNotification }) => {
  const blogFormRef = useRef()

  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }

  const handleLike = async (e) => {
    try {
      const blogId = e.target.id
      const blog = blogs.find((b) => b.id === blogId)
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.updateLikes(blogId, updatedBlog, config)
      getBlogs()
    } catch (e) {
      console.log(e)
    }
  }

  const handleDelete = async (e) => {
    try {
      if (
        confirm(
          `remove blog ${e.target.getAttribute(
            'data-blogtitle'
          )} by ${e.target.getAttribute('data-blogauthor')} ?`
        )
      ) {
        const blogId = e.target.id
        await blogService.deleteBlog(blogId, config)
        getBlogs()
        handleNotification(
          `blog ${e.target.getAttribute(
            'data-blogtitle'
          )} deleted successfully`,
          'success'
        )
      } else {
        handleNotification(
          `did NOT delete blog ${e.target.getAttribute(
            'blogtitle'
          )}. reason: canceled by user`,
          'failure'
        )
      }
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
          getBlogs={getBlogs}
          blogFormRef={blogFormRef}
          config={config}
          handleNotification={handleNotification}
        />
      </Toggable>
      {blogs.map((blog) => (
        <div
          style={{ border: '1px solid', padding: '5px', margin: '5px 0 5px 0' }}
          key={blog.id}
        >
          Title:{blog.title} -{blog.author}
          <Toggable showLabel={'show info'} hideLabel={'hide info'}>
            <div>URL: {blog.url}</div>
            <div>
              Likes: {blog.likes}{' '}
              <button id={blog.id} onClick={handleLike}>
                like
              </button>
            </div>
            <div>User: {blog.user.name}</div>
            <button
              data-blogtitle={blog.title}
              data-blogauthor={blog.author}
              id={blog.id}
              onClick={handleDelete}
            >
              delete
            </button>
          </Toggable>
        </div>
      ))}
    </div>
  )
}

const AddBlog = ({ getBlogs, config, handleNotification, blogFormRef }) => {
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
      getBlogs()
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
