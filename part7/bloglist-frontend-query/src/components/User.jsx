import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../requests'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import TableBody from '@mui/material/TableBody'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

const Users = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    initialData: [],
    queryKey: ['users'],
    queryFn: getUsers,
  })

  if (isLoading) {
    return <div>loading users...</div>
  }

  if (isError) {
    return <div>error: {error.message}</div>
  }
  return (
    <Box sx={{ mt: 3 }}>
      <Typography sx={{ textAlign: 'center', mb: 3 }} variant='h4'>
        users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.username}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

const User = () => {
  const navigate = useNavigate()
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
  const id = useParams().id

  if (isLoading) {
    return <div>loading...</div>
  }
  if (isError) {
    return <div>error: {error.message}</div>
  }

  const user = users.find((user) => user.id === id)
  const userBlogs = user.blogs
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant='h3'>{user.name}</Typography>
      </Box>
      <Box>
        <Typography variant='h6'>added blogs</Typography>
        <List>
          {userBlogs.map((blog) => (
            <ListItem key={blog.id}>{blog.title}</ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export { Users, User }
