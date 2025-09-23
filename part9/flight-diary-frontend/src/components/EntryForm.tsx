import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import diaryService from '../services/diaryService';

const EntryForm = () => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await diaryService.createEntry({
      date,
      visibility,
      weather,
      comment,
    });
    resetInputs();
  };

  const resetInputs = () => {
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>date</label>
          <input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>visibility</label>
          <input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div>
          <label>weather</label>
          <input value={weather} onChange={(e) => setWeather(e.target.value)} />
        </div>
        <div>
          <label>comment</label>
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default EntryForm;
