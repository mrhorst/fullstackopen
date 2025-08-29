import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

export const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
      state.sort((a, b) => b.votes - a.votes)
    },

    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    },

    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      const index = state.findIndex((a) => a.id === updatedAnecdote.id)
      state[index] = updatedAnecdote
      state.sort((a, b) => b.votes - a.votes)
    },
  },
})

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createAnecdote(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteToVote = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await anecdotesService.updateAnecdote(anecdoteToVote)
    dispatch(updateAnecdote(response))
  }
}

export const { setAnecdotes, appendAnecdote, updateAnecdote } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
