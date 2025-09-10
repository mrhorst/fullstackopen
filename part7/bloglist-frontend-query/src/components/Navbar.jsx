import { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext)

  const logout = () => {
    localStorage.removeItem('loggedUser')
    logoutUser()
  }

  const navLinkStyle = {
    textAlign: 'center',
    fontFamily: 'monospace',
    fontWeight: 500,
    color: 'white',
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: 64,
          }}
        >
          <Box width={'75px'}>
            <Typography variant='h5'>blogl</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flex: 1,
            }}
          >
            <Link
              component={RouterLink}
              sx={navLinkStyle}
              underline='none'
              to='/'
            >
              home
            </Link>
            <Link
              sx={navLinkStyle}
              underline='none'
              component={RouterLink}
              to='/users'
            >
              users
            </Link>
          </Box>
          <Box
            width={'75px'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Button
              size='small'
              variant='outlined'
              color='white'
              onClick={logout}
            >
              logout
            </Button>
            <Typography sx={navLinkStyle} variant='subtitle2'>
              {user.name}
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
