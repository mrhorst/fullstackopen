import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import diaryService from '../services/diaryService';
import Notification from './Notification';
import { isAxiosError, type AxiosError } from 'axios';

const EntryForm = () => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await diaryService.createEntry({
        date,
        visibility,
        weather,
        comment,
      });
      resetInputs();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        showNotification(error);
        setTimeout(() => clearNotification(), 3000);
      }
    }
  };

  const showNotification = (error: AxiosError) => {
    const data = error.response?.data;
    if (typeof data === 'string') {
      setMessage(data);
    } else {
      setMessage('unknown error');
    }
  };

  const clearNotification = () => {
    setMessage('');
  };

  const resetInputs = () => {
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <div>
      {message && <Notification message={message} />}
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
