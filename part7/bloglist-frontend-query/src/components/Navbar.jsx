import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', gap: 7 }}>
      <Link to='/'>home</Link>
      <Link to='/users'>users</Link>
    </nav>
  )
}

export default Navbar
