import axios from 'axios';
import { type DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  const diaryEntries = await axios.get<DiaryEntry[]>(baseUrl);
  return diaryEntries.data;
};

export default { getAll };
