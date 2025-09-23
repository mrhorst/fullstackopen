import { useEffect, useState } from 'react';
import diaryService from './services/diaryService';
import { type DiaryEntry } from './types';
import Diary from './components/Diary';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    diaryService.getAll().then((data) => {
      setDiaries(data);
    });
  });
  return (
    <div>
      <h1>Flight Diary</h1>
      <Diary diaries={diaries} />
    </div>
  );
}

export default App;
