import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import diaryService from '../services/diaryService';
import Notification from './Notification';
import { isAxiosError, type AxiosError } from 'axios';
import { type Visibility, type Weather } from '../types';

const EntryForm = () => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('good');
  const [weather, setWeather] = useState<Weather>('cloudy');
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
    setVisibility('good');
    setWeather('cloudy');
    setComment('');
  };

  const visibilityOptions: Visibility[] = ['good', 'great', 'ok', 'poor'];
  const weatherOptions: Weather[] = [
    'cloudy',
    'rainy',
    'stormy',
    'sunny',
    'windy',
  ];

  return (
    <div>
      {message && <Notification message={message} />}
      <form onSubmit={submit}>
        <div>
          <label>date</label>
          <input
            type={'date'}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <label>visibility</label>
          {visibilityOptions.map((option) => (
            <div key={option} style={{ display: 'flex', alignItems: 'center' }}>
              <label>{option}</label>
              <input
                type='radio'
                name='visibility'
                value={option}
                onChange={() => setVisibility(option)}
                checked={option === visibility}
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          <label>weather</label>
          {weatherOptions.map((option) => (
            <div key={option} style={{ display: 'flex', alignItems: 'center' }}>
              <label>{option}</label>
              <input
                type='radio'
                name='weather'
                value={option}
                onChange={() => setWeather(option)}
                checked={option === weather}
              />
            </div>
          ))}
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
