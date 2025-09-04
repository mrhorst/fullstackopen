import { useState } from 'react'
import { useRef } from 'react'
import blogService from '../services/blogs'
import Toggable from './Toggable'
import { useDispatch } from 'react-redux'
import { createBlog, likeBlog } from '../reducers/blogSlice'

const Blog = ({ blogs, user, handleNotification, config }) => {
  const dispatch = useDispatch()

  const handleCreateBlog = async (title, author, url) => {
    try {
      const blog = {
        title,
        author,
        url,
      }

      dispatch(createBlog(blog, config))
      handleNotification(
        `new blog added: ${blog.title} by ${blog.author}`,
        'success'
      )
      blogFormRef.current.toggleVisibility()
    } catch (e) {
      handleNotification(e.response.data.error, 'failure')
    }
  }
  const blogFormRef = useRef()

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
      handleNotification(e.response.data.error, 'failure')
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
