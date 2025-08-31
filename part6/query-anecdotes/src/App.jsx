import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import {
  useNotificationDispatch,
  useNotificationValue,
} from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const notification = useNotificationValue()

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote)
    dispatch({ type: 'VOTE', payload: anecdote.content })
    setTimeout(() => dispatch({ type: 'CLEAR' }), 3000)
  }

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const newAnecdotes = anecdotes.map((a) =>
        a.id === updatedAnecdote.id ? updatedAnecdote : a
      )
      queryClient.setQueryData(['anecdotes'], newAnecdotes)
    },
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })

  if (result.isPending) {
    return <div>loading...</div>
  }

  if (result.isError) {
    return (
      <div>anecdote service not available due to problems in the server</div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notification} />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
