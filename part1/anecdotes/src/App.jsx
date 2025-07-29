import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const randomAnecdote = (anecdotes) => {
    return Math.round((Math.random() * 100) % (anecdotes.length - 1))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} selected={selected} votes={votes} />
      <Button
        text={'vote'}
        onClick={() =>
          setVotes({ ...votes, [selected]: (votes[selected] || 0) + 1 })
        }
      />
      <Button
        text={'next anecdote'}
        onClick={() => setSelected(randomAnecdote(anecdotes))}
      />
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

const Anecdote = (props) => {
  return (
    <>
      <p>{props.anecdotes[props.selected]}</p>
      <p>has {props.votes[props.selected] || 0} votes</p>
    </>
  )
}

const MostVotedAnecdote = (props) => {
  const voteCounts = props.anecdotes.map((_, i) => props.votes[i] || 0)
  const maxVotes = Math.max(...voteCounts)
  const maxIndex = voteCounts.indexOf(maxVotes)

  return (
    <>
      <h1>Anecdote with most votes</h1>
      {maxVotes === 0 ? (
        <p>No votes yet</p>
      ) : (
        <Anecdote
          anecdotes={props.anecdotes}
          votes={props.votes}
          selected={maxIndex}
        />
      )}
    </>
  )
}

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

export default App
