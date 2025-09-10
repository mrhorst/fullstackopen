import { useContext, useState, useRef, useEffect } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'

import {
  createBlog,
  getBlogs,
  deleteBlog,
  likeBlog,
  addComment,
  getBlogById,
} from '../requests'

import { NotificationContext } from '../context/NotificationContext'
import { UserContext } from '../context/UserContext'

import Toggable from './Toggable'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

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
      showNotification(error.response.data.error, 'error')
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 2,
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          minWidth: '300px',
        }}
      >
        <Toggable ref={blogFormRef}>
          <AddBlog handleCreateBlog={handleCreateBlog} />
        </Toggable>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '500px',
          width: '100%',
          gap: 1,
        }}
      >
        {blogs.map((blog) => (
          <Box
            sx={{
              height: '65px',
              borderBottom: '1px solid #ccc',
              padding: '5px 0',
              display: 'flex',
              alignItems: 'center',
            }}
            key={blog.id}
            className='blogs'
          >
            <Link component={RouterLink} to={`/blog/${blog.id}`}>
              {blog.title}, by {blog.author}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export const Blog = () => {
  const id = useParams().id
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const blogQuery = useQuery({
    queryKey: ['blog', id],
    queryFn: ({ queryKey }) => getBlogById(queryKey[1]),
    initialData: () => {
      const listOfBlogs = queryClient.getQueryData(['blogs'])
      return listOfBlogs?.find((b) => b.id === id)
    },
  })

  const { config } = useContext(UserContext)
  const { showNotification } = useContext(NotificationContext)

  const invalidateBlogs = () => {
    queryClient.invalidateQueries(['blogs'])
    queryClient.invalidateQueries(['blog'])
  }

  const likeBlogMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: (likedBlog) => {
      showNotification(`You liked '${likedBlog.title}'!`, 'success')
      invalidateBlogs()
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
      showNotification(error.response.data.error, 'error')
      queryClient.setQueryData(['blogs'], context)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: (_data, { blog }) => {
      showNotification(`blog ${blog.title} deleted successfully`, 'success')
      invalidateBlogs()
      navigate('/')
    },
    onError: (error) => {
      showNotification(error.response.data.error, 'error')
    },
  })

  const blog = blogQuery.data

  const mutations = [likeBlogMutation, blogQuery]

  const isLoading = mutations.some((mutation) => mutation.isLoading)
  const isError = mutations.some((mutation) => mutation.isError)

  useEffect(() => {
    if (!isLoading && (!blog || isError)) {
      showNotification('blog not found or it has been deleted', 'error')
      navigate('/blogs')
    }
  }, [blog, isLoading, isError])

  if (isLoading) {
    return <div>loading...</div>
  }

  if (isError) {
    return <div>error</div>
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
        'error'
      )
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minWidth: '450px',
        alignItems: 'center',
      }}
    >
      <Typography textAlign='center' variant='h4'>
        {blog.title}
      </Typography>
      <Typography variant='h5'>{blog.author}</Typography>
      <Link variant='body1' href={`https://${blog.url}`}>
        {blog.url}
      </Link>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Typography alignContent='center' variant='body1'>
          {blog.likes} likes{' '}
        </Typography>
        <Button
          variant='contained'
          size='small'
          onClick={() => handleLike(blog)}
        >
          like
        </Button>
      </Box>
      <Typography variant='body1'>added by {blog.user.name}</Typography>
      <Comments blog={blog} />
      <Button
        color='warning'
        variant='contained'
        onClick={() => handleDelete(blog)}
        sx={{ minWidth: '130px', maxWidth: '150px' }}
      >
        delete blog
      </Button>
    </Box>
  )
}

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')
  const { showNotification } = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const commentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['blog'])
      queryClient.invalidateQueries(['blogs'])
      setComment('')
      showNotification('you left a comment', 'success')
    },
    onError: (error) => {
      showNotification(`error: ${error.message}`, 'error')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    commentMutation.mutate({ blogId: blog.id, comment })
  }
  return (
    <Box>
      <Typography textAlign='center' variant='h5' gutterBottom>
        comments
      </Typography>

      <Box component='form' onSubmit={handleSubmit}>
        <TextField
          label='comment'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          size='small'
        />
        <Button type='submit' variant='contained' sx={{ ml: 2 }}>
          add comment
        </Button>
      </Box>

      <List>
        {blog.comments.map((comment) => (
          <ListItem
            sx={{
              padding: '3px 0',
              borderBottom: '1px solid #ccc',
              width: '100%',
            }}
            key={comment.id}
          >
            <Typography variant='body2'>{comment.comment}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
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
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        my: 2,
        maxWidth: '400px',
        mx: 'auto',
        alignItems: 'center',
      }}
    >
      <TextField
        label='title'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        size='small'
      />
      <TextField
        label='author'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        size='small'
      />
      <TextField
        label='url'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        size='small'
      />

      <Button
        sx={{ width: '50%' }}
        type='submit'
        variant='contained'
        size='small'
      >
        add blog
      </Button>
    </Box>
  )
}
