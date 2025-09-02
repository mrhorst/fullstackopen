import { Link, useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

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
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const reset = useField('reset')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.input.value,
      author: author.input.value,
      info: info.input.value,
      votes: 0,
    })
    navigate('/')
  }

  const resetInput = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.input} />
        </div>
        <div>
          author
          <input name='author' {...author.input} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.input} />
        </div>
        <button name='create'>create</button>
        <input {...reset.input} value='reset' onClick={() => resetInput()} />
      </form>
    </div>
  )
}

export { AnecdoteList, Anecdote, CreateNew }
