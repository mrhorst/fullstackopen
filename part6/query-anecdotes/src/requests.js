import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => {
  return Math.round(Math.random() * 1000000)
}

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (anecdote) => {
  const response = await axios.post(baseUrl, { ...anecdote, id: getId() })
  return response.data
}
