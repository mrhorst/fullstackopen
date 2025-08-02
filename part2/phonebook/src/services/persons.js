import axios from 'axios'

const url = 'http://localhost:3001/persons'

const create = (person) => {
  axios.post(url, person).then((response) => response.data)
}

const getAll = () => {
  return axios.get(url).then((response) => response.data)
}

const deletePerson = (personId) => {
  return axios.delete(`${url}/${personId}`)
}

const updatePerson = (personId, updatedPerson) => {
  return axios.put(`${url}/${personId}`, updatedPerson)
}

export default {
  create,
  getAll,
  deletePerson,
  updatePerson,
}
