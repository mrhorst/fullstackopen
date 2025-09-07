import { useState, useContext } from 'react'
import { NotificationContext } from '../context/NotificationContext'
import { UserContext } from '../context/UserContext'
import { useMutation } from '@tanstack/react-query'
import { login } from '../requests'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { showNotification } = useContext(NotificationContext)
  const { loginUser } = useContext(UserContext)

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      loginUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      showNotification(`Welcome, ${user.name}!`, 'success')
      setUsername('')
      setPassword('')
    },
    onError: (error) => {
      showNotification(error.response.data.error, 'failure')
    },
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    loginMutation.mutate({ username, password })
  }

  const handleInput = (e) => {
    if (e.target.id === 'username-input') {
      setUsername(e.target.value)
    }
    if (e.target.id === 'password-input') {
      setPassword(e.target.value)
    }
  }
  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username-input'>username</label>
          <input id='username-input' onChange={handleInput} value={username} />
        </div>
        <div>
          <label htmlFor='password-input'>password</label>
          <input id='password-input' onChange={handleInput} value={password} />
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

export default Login
