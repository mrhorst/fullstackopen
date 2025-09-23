import { useEffect, useState } from 'react';
import diaryService from './services/diaryService';
import { type NonSensitiveDiaryEntry } from './types';
import Diary from './components/Diary';
import EntryForm from './components/EntryForm';

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  useEffect(() => {
    diaryService.getAll().then((data) => {
      setDiaries(data);
    });
  });
  return (
    <div>
      <h1>Flight Diary</h1>
      <EntryForm />
      <Diary diaries={diaries} />
    </div>
  );
}

export default App;
