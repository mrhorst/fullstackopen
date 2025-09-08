import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext)

  const logout = () => {
    localStorage.removeItem('loggedUser')
    logoutUser()
  }

  return (
    <nav style={{ display: 'flex', gap: 7 }}>
      <Link to='/'>home</Link>
      <Link to='/users'>users</Link>
      {user.name} logged in <button onClick={logout}>logout</button>
    </nav>
  )
}

export default Navbar
