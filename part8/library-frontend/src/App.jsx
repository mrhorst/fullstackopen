import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notification from './components/Notification'
import Recommendations from './components/Recommendations'
import {
  useApolloClient,
  useQuery,
  useSubscription,
} from '@apollo/client/react'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('library-user-token')
    if (tokenFromStorage) {
      setToken(tokenFromStorage)
    }
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const bookAdded = data.data.bookAdded
      setMessage(`${bookAdded.title} added`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(bookAdded),
        }
      })
    },
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const handleLogout = (e) => {
    e.preventDefault()
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
    setPage('books')
  }

  const allBooks = result.data.allBooks

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

      <Books allBooks={allBooks} show={page === 'books'} />

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
