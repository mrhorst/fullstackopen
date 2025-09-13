import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { LOGIN } from '../mutations'
import { useEffect } from 'react'

const Login = ({ show, setToken, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setMessage(error.errors[0].message)
      setTimeout(() => setMessage(null), 3000)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])

  if (!show) {
    return null
  }

  const submit = (e) => {
    e.preventDefault()

    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <label>password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
