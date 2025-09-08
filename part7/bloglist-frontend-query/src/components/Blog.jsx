import { useContext, useState, useRef } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { createBlog, getBlogs, deleteBlog, likeBlog } from '../requests'

import { NotificationContext } from '../context/NotificationContext'
import { UserContext } from '../context/UserContext'

import Toggable from './Toggable'

export const Blogs = () => {
  const blogFormRef = useRef()
  const { showNotification } = useContext(NotificationContext)
  const { config } = useContext(UserContext)
  const queryClient = useQueryClient()

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  })

  const addBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (addedBlog) => {
      showNotification(
        `new blog added: ${addedBlog.title} by ${addedBlog.author}`,
        'success'
      )
      blogFormRef.current.toggleVisibility()
      queryClient.invalidateQueries(['blogs'])
    },
    onError: (error) => {
      showNotification(error.response.data.error, 'failure')
    },
  })

  const blogs = blogsQuery.data

  const mutations = [addBlogMutation, blogsQuery]

  const isLoading = mutations.some((mutation) => mutation.isLoading)
  const isError = mutations.some((mutation) => mutation.isError)

  if (isLoading) {
    return <div>loading blogs...</div>
  }

  if (isError) {
    return <div>error</div>
  }

  const handleCreateBlog = async (title, author, url) => {
    const blog = { title, author, url }
    addBlogMutation.mutate({ blog, config })
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
          <Link to={`/blog/${blog.id}`}>
            {blog.title}, by {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export const Blog = () => {
  const id = useParams().id
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const blogsQuery = useQuery({
    queryFn: getBlogs,
    queryKey: ['blogs'],
  })

  const { config } = useContext(UserContext)
  const { showNotification } = useContext(NotificationContext)

  const likeBlogMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: (likedBlog) => {
      showNotification(`You liked '${likedBlog.title}'!`, 'success')
      queryClient.invalidateQueries(['blogs'])
    },
    onMutate: ({ blog }) => {
      const previousBlogs = queryClient.getQueryData(['blogs'])

      queryClient.setQueryData(['blogs'], (oldBlogs) =>
        oldBlogs.map((b) =>
          b.id === blog.id ? { ...b, likes: b.likes + 1 } : b
        )
      )
      return previousBlogs
    },
    onError: (error, _var, context) => {
      showNotification(error.response.data.error, 'failure')
      queryClient.setQueryData(['blogs'], context)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: (_data, { blog }) => {
      showNotification(`blog ${blog.title} deleted successfully`, 'success')
      queryClient.invalidateQueries(['blogs'])
      navigate('/')
    },
    onError: (error) => {
      showNotification(error.response.data.error, 'failure')
    },
  })

  const blogs = blogsQuery.data

  const mutations = [likeBlogMutation, blogsQuery]

  const isLoading = mutations.some((mutation) => mutation.isLoading)
  const isError = mutations.some((mutation) => mutation.isError)

  if (isLoading) {
    return <div>loading...</div>
  }

  if (isError) {
    return <div>error: {likeBlogMutation.error.message}</div>
  }

  const handleLike = async (blog) => {
    likeBlogMutation.mutate({ blog, config })
  }

  const handleDelete = async (blog) => {
    if (confirm(`remove blog ${blog.title} by ${blog.author} ?`)) {
      deleteBlogMutation.mutate({ blog, config })
    } else {
      showNotification(
        `did NOT delete blog ${blog.title}. reason: canceled by user`,
        'failure'
      )
    }
  }

  const blog = blogs.find((b) => b.id === id)

  return (
    <div>
      <button onClick={() => navigate(-1)}>back</button>
      <h2>
        {blog.title}, by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes{' '}
        <button onClick={() => handleLike(blog)}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <button onClick={() => handleDelete(blog)}>delete</button>
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
    clearInputFields()
  }

  const clearInputFields = () => {
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
