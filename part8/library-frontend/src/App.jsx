import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notification from './components/Notification'
import Recommendations from './components/Recommendations'
import { useApolloClient } from '@apollo/client/react'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('library-user-token')
    if (tokenFromStorage) {
      setToken(tokenFromStorage)
    }
  })

  const handleLogout = (e) => {
    e.preventDefault()
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
    setPage('books')
  }

  return (
    <div>
      <Notification message={message} />
      <div style={{ display: 'flex' }}>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommendations')}>
          recommendations
        </button>
        {token ? (
          <div>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={handleLogout}>logout</button>
          </div>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Recommendations show={page === 'recommendations'} />

      <Authors setMessage={setMessage} show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Login
        setMessage={setMessage}
        setToken={setToken}
        show={page === 'login'}
        setPage={setPage}
      />
    </div>
  )
}

export default App
