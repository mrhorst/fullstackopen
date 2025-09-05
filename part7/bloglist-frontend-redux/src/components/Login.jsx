import { useState } from 'react'
import { login } from '../reducers/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const Login = ({ handleNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(login({ username, password }, handleNotification))
    setUsername('')
    setPassword('')
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
