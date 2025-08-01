import axios from 'axios'

const url = 'http://localhost:3001/persons'

const create = (person) => {
  axios.post(url, person).then((response) => response.data)
}

const getAll = () => {
  return axios.get(url).then((response) => response.data)
}

const deletePerson = (personId) => {
  axios.delete(`${url}/${personId}`)
}

export default {
  create,
  getAll,
  deletePerson,
}
