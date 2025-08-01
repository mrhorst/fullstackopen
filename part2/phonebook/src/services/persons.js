import axios from 'axios'

const create = (person) => {
  axios
    .post('http://localhost:3001/persons', person)
    .then((response) => response.data)
}

const getAll = () => {
  return axios
    .get('http://localhost:3001/persons')
    .then((response) => response.data)
}

export default {
  create,
  getAll,
}
