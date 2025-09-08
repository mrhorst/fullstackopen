import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../requests'
import { useParams, Link } from 'react-router-dom'

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
    <div>
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.username}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const User = () => {
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
    <div>
      <h1>{user.name}</h1>
      <h4>added blogs</h4>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export { Users, User }
