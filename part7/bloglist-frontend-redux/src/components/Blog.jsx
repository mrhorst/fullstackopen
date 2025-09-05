import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Toggable from './Toggable'

import { createBlog, deleteBlog, likeBlog } from '../reducers/blogSlice'

const Blog = ({ handleNotification }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const config = useSelector((state) => state.user.config)
  const blogFormRef = useRef()

  const handleCreateBlog = async (title, author, url) => {
    const blog = { title, author, url }
    dispatch(createBlog(blog, config, handleNotification))
    blogFormRef.current.toggleVisibility()
  }

  const handleDelete = async (blog) => {
    if (confirm(`remove blog ${blog.title} by ${blog.author} ?`)) {
      dispatch(deleteBlog(blog, config, handleNotification))
    } else {
      handleNotification(
        `did NOT delete blog ${blog.title}. reason: canceled by user`,
        'failure'
      )
    }
  }

  return (
    <div>
      <Toggable
        ref={blogFormRef}
        hideLabel={'hide form'}
        showLabel={'show form'}
      >
        <AddBlog handleCreateBlog={handleCreateBlog} />
      </Toggable>
      {blogs.map((blog) => (
        <div
          style={{ border: '1px solid', padding: '5px', margin: '5px 0 5px 0' }}
          key={blog.id}
          className='blogs'
        >
          Title:{blog.title} -{blog.author}
          <Toggable showLabel={'show info'} hideLabel={'hide info'}>
            <div>URL: {blog.url}</div>
            <div>
              Likes: {blog.likes}{' '}
              <button
                id={blog.id}
                onClick={() => dispatch(likeBlog(blog, config))}
              >
                like
              </button>
            </div>
            <div>User: {blog.user.name}</div>
            <button
              style={
                user.username === blog.user.username
                  ? { display: '' }
                  : { display: 'none' }
              }
              id={blog.id}
              onClick={() => handleDelete(blog)}
            >
              delete
            </button>
          </Toggable>
        </div>
      ))}
    </div>
  )
}

export const AddBlog = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCreateBlog(title, author, url)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='titleInput'>title</label>
          <input
            id={'titleInput'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='authorInput'>author</label>
          <input
            id={'authorInput'}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='urlInput'>url</label>
          <input
            id={'urlInput'}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button>add blog</button>
      </form>
    </div>
  )
}

export default Blog
