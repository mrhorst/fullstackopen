import { useEffect, useState } from 'react'
import loginService from '../services/login'

const Login = ({ setUser, user }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log(e)
    }
  }

  const handleInput = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value)
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }
  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input name="username" onChange={handleInput} value={username} />
        </div>
        <div>
          password{' '}
          <input name="password" onChange={handleInput} value={password} />
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

export default Login
