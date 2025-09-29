import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import patientService from '../../services/patients';
import { HealthCheckEntryForm, HealthCheckRating } from '../../types';

interface Props {
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  userId: string;
}

export const AddEntryForm = ({ setOpenForm, userId }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    const entry: HealthCheckEntryForm = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating,
    };
    patientService.addEntry(userId, entry);
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
