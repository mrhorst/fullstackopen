import { useEffect, useContext } from 'react'
import Notification from './components/Notification'
import { Users, User } from './components/User'
import { UserContext } from './context/UserContext'
import { Blogs, Blog } from './components/Blog'
import Login from './components/Login'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const App = () => {
  const { user, loginUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      const loggedUserJSON = localStorage.getItem('loggedUser')

      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        loginUser(loggedUser)
      }
    }
  }, [user, loginUser])

  return (
    <div>
      {user === null ? (
        <div>
          <Notification />
          <Login />
        </div>
      ) : (
        <div>
          <Navbar />
          <Notification />
          <Box sx={{ m: 4 }}>
            <Box
              sx={{
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                borderBottom: '1px solid #eee',
                pb: 4,
                mb: 3,
              }}
            >
              <Button
                sx={{ position: 'absolute' }}
                variant='outlined'
                size='small'
                onClick={() => navigate(-1)}
              >
                back
              </Button>
            </Box>
            <Routes>
              <Route path='/' element={<Blogs />} />
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/blog/:id' element={<Blog />} />
              <Route path='/users' element={<Users />} />
              <Route path='/users/:id' element={<User />} />
            </Routes>
          </Box>
        </div>
      )}
    </div>
  )
}

export default App
