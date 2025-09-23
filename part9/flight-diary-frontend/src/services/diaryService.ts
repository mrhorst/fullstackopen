import axios from 'axios';
import {
  type DiaryEntry,
  type NewDiaryEntry,
  type NonSensitiveDiaryEntry,
} from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  const diaryEntries = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return diaryEntries.data;
};

const createEntry = async (data: NewDiaryEntry) => {
  const newEntry = await axios.post<DiaryEntry>(baseUrl, data);
  return newEntry.data;
};

export default { getAll, createEntry };
