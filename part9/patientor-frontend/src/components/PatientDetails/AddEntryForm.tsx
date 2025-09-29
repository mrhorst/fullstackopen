import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import patientService from '../../services/patients';
import { HealthCheckEntryForm, HealthCheckRating } from '../../types';
import { AxiosError } from 'axios';

interface Props {
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  userId: string;
  setMessage: Dispatch<SetStateAction<string | null>>;
}

export const AddEntryForm = ({ setOpenForm, userId, setMessage }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);

  const submitForm = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const entry: HealthCheckEntryForm = {
        type: 'HealthCheck',
        description,
        date,
        specialist,
        healthCheckRating,
      };
      await patientService.addEntry(userId, entry);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorName = error.response?.data.error.name;
        if (errorName === 'ZodError') {
          const issue = error.response?.data.error.issues[0];
          const message = issue.errors[0][0].message;
          setMessage(`${message}`);
          setTimeout(() => setMessage(null), 3000);
        }
      }
    }
  };

  const closeForm = (e: SyntheticEvent) => {
    e.preventDefault();
    setOpenForm(false);
  };

  return (
    <div
      style={{
        border: '1px dotted',
        padding: '5px',
        marginTop: '10px',
      }}
    >
      <h4>New Entry</h4>
      <form onSubmit={submitForm}>
        <div>
          <div>
            <label htmlFor='description'>description</label>
          </div>
          <input
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor='date'>date</label>
          </div>
          <input
            name='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor='specialist'>specialist</label>
          </div>
          <input
            name='specialist'
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor='healthCheckRating'>healthCheckRating</label>
          </div>
          <input
            name='healthCheckRating'
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          <button onClick={closeForm}>cancel</button>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  );
};
