import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/diagnosis';

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

export default { getAll };
