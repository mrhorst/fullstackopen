import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>
      for more info see <a href={anecdote.info}>{anecdote.info}</a>
    </p>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
          <li>{anecdote.content}</li>
        </Link>
      ))}
    </ul>
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name='info'
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export { AnecdoteList, Anecdote, CreateNew }
