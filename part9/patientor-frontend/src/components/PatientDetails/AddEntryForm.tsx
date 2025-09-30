import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react';
import patientService from '../../services/patients';
import {
  Diagnosis,
  Entry,
  EntryWithoutId,
  HealthCheckRating,
  SickLeave,
} from '../../types';
import { AxiosError } from 'axios';

interface Props {
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  userId: string;
  setMessage: Dispatch<SetStateAction<string | null>>;
  setPatientEntries: Dispatch<SetStateAction<Entry[]>>;
}

export const AddEntryForm = ({
  setOpenForm,
  userId,
  setMessage,
  setPatientEntries,
}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);
  const [diagnosisCodesInput, setDiagnosisCodesInput] =
    useState<Diagnosis['code']>('');
  const [diagnosisCodesArray, setDiagnosisCodesArray] = useState<
    Diagnosis['code'][]
  >([]);
  const [option, setOption] = useState('HealthCheck');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState<SickLeave | undefined>(undefined);

  const entryTypes: string[] = [
    'HealthCheck',
    'OccupationalHealthcare',
    'Hospital',
  ];

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      let payload: EntryWithoutId;

      switch (option) {
        case 'HealthCheck':
          payload = {
            type: 'HealthCheck',
            description,
            date,
            specialist,
            healthCheckRating,
            diagnosisCodes: diagnosisCodesArray,
          };
          break;
        case 'OccupationalHealthcare':
          const hasSickLeave =
            sickLeave &&
            (sickLeave?.startDate.trim() || sickLeave?.endDate.trim());
          payload = {
            type: 'OccupationalHealthcare',
            description,
            date,
            specialist,
            employerName,
            ...(hasSickLeave
              ? {
                  sickLeave: {
                    startDate: sickLeave!.startDate,
                    endDate: sickLeave!.endDate,
                  },
                }
              : {}),
            diagnosisCodes: diagnosisCodesArray,
          };
          break;
        case 'Hospital':
          payload = {
            type: 'Hospital',
            description,
            date,
            specialist,
            discharge: { date: dischargeDate, criteria: dischargeCriteria },
            diagnosisCodes: diagnosisCodesArray,
          };
          break;
        default:
          throw new Error('incorrect entry type');
      }

      const newEntry = await patientService.addEntry(userId, payload);
      // optimistic update on patient entries...
      setPatientEntries((prev) => prev.concat(newEntry));
      setMessage('Entry added successfully');
      setTimeout(() => setMessage(null), 3000);
      setOpenForm(false);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorName = error.response?.data.error.name;
        if (errorName === 'ZodError') {
          const firstIssue = error.response?.data.error.issues[0];
          if (firstIssue.code === 'invalid_union') {
            setMessage(firstIssue.errors[0][0].message);
            setTimeout(() => setMessage(null), 3000);
          } else if (firstIssue.code === 'too_small') {
            setMessage(firstIssue.message);
            setTimeout(() => setMessage(null), 3000);
          }
        }
      }
    }
  };

  const addDiagnosisCode = (e: SyntheticEvent): void => {
    e.preventDefault();
    setDiagnosisCodesArray(diagnosisCodesArray.concat(diagnosisCodesInput));
    setDiagnosisCodesInput('');
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
          <RadioButtonInput
            entryTypes={entryTypes}
            setOption={setOption}
            option={option}
          />
        </div>
        <BaseEntryInput
          description={description}
          setDescription={setDescription}
          date={date}
          setDate={setDate}
          specialist={specialist}
          setSpecialist={setSpecialist}
          diagnosisCodesInput={diagnosisCodesInput}
          setDiagnosisCodesInput={setDiagnosisCodesInput}
          addDiagnosisCode={addDiagnosisCode}
          diagnosisCodesArray={diagnosisCodesArray}
        />
        {option === 'HealthCheck' && (
          <HealthCheckInput
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
          />
        )}
        {option === 'Hospital' && (
          <HospitalInput
            setDischargeDate={setDischargeDate}
            dischargeDate={dischargeDate}
            setDischargeCriteria={setDischargeCriteria}
            dischargeCriteria={dischargeCriteria}
          />
        )}
        {option === 'OccupationalHealthcare' && (
          <OccupationalHealthcare
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
          />
        )}

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

interface OccupationalHealthcareInputProps {
  setEmployerName: Dispatch<SetStateAction<string>>;
  employerName: string;
  sickLeave?: SickLeave;
  setSickLeave: Dispatch<SetStateAction<SickLeave | undefined>>;
}

const OccupationalHealthcare = ({
  employerName,
  setEmployerName,
  sickLeave,
  setSickLeave,
}: OccupationalHealthcareInputProps) => {
  return (
    <div>
      <h3>Occupational Healthcare</h3>
      <div>
        <label htmlFor='employerName'>employer name</label>
      </div>
      <input
        name='employerName'
        value={employerName}
        onChange={(e) => setEmployerName(e.target.value)}
      />
      <div>
        <p>Sick Leave</p>
        <div>
          <label htmlFor='sickStart'>start date</label>
        </div>
        <input
          name='sickStart'
          type='date'
          value={sickLeave?.startDate ?? ''}
          onChange={(e) =>
            setSickLeave((prev) => ({
              ...(prev ?? { startDate: '', endDate: '' }),
              startDate: e.target.value,
            }))
          }
        />
        <div>
          <label htmlFor='sickEnd'>end date</label>
        </div>
        <input
          name='sickEnd'
          type='date'
          value={sickLeave?.endDate ?? ''}
          onChange={(e) =>
            setSickLeave((prev) => ({
              ...(prev ?? { startDate: '', endDate: '' }),
              endDate: e.target.value,
            }))
          }
        />
      </div>
    </div>
  );
};

interface HospitalInputProps {
  dischargeDate: string;
  setDischargeDate: Dispatch<SetStateAction<string>>;
  dischargeCriteria: string;
  setDischargeCriteria: Dispatch<SetStateAction<string>>;
}

const HospitalInput = ({
  dischargeDate,
  setDischargeDate,
  dischargeCriteria,
  setDischargeCriteria,
}: HospitalInputProps) => {
  return (
    <div>
      <h3>Discharge</h3>
      <div>
        <label htmlFor='dischargeDate'>date</label>
      </div>
      <input
        name='dischargeDate'
        type='date'
        value={dischargeDate}
        onChange={(e) => setDischargeDate(e.target.value)}
      />
      <div>
        <label htmlFor='dischargeCriteria'>Criteria</label>
      </div>
      <input
        name='dischargeCriteria'
        value={dischargeCriteria}
        onChange={(e) => setDischargeCriteria(e.target.value)}
      />
    </div>
  );
};

interface HealthCheckProps {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: Dispatch<SetStateAction<HealthCheckRating>>;
}

const HealthCheckInput = ({
  healthCheckRating,
  setHealthCheckRating,
}: HealthCheckProps) => {
  return (
    <div>
      <div>
        <label htmlFor='healthCheckRating'>healthCheckRating</label>
      </div>
      <select
        name='healthCheckRating'
        id='healthCheckRating'
        value={healthCheckRating}
        onChange={(e) => setHealthCheckRating(Number(e.target.value))}
      >
        <option value='0'>healthy</option>
        <option value='1'>low risk</option>
        <option value='2'>high risk</option>
        <option value='3'>critical risk</option>
      </select>
    </div>
  );
};

interface BaseInputProps {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  specialist: string;
  setSpecialist: Dispatch<SetStateAction<string>>;
  diagnosisCodesInput: string;
  setDiagnosisCodesInput: Dispatch<SetStateAction<string>>;
  addDiagnosisCode: (e: SyntheticEvent) => void;
  diagnosisCodesArray: string[];
}

const BaseEntryInput = ({
  description,
  setDescription,
  date,
  setDate,
  specialist,
  setSpecialist,
  diagnosisCodesInput,
  setDiagnosisCodesInput,
  addDiagnosisCode,
  diagnosisCodesArray,
}: BaseInputProps) => {
  return (
    <div>
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
          type='date'
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
          <label htmlFor='diagnosisCodes'>diagnosis codes</label>
        </div>
        <input
          name='diagnosisCodes'
          value={diagnosisCodesInput}
          onChange={(e) => setDiagnosisCodesInput(e.target.value)}
        />
        <button onClick={addDiagnosisCode}>add diagnosis code</button>
      </div>
      <div>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '5px',
            margin: '5px 0',
            padding: 0,
          }}
        >
          {diagnosisCodesArray.map((code) => {
            return (
              <li
                style={{
                  border: '1px solid #CCC',
                  padding: '8px',
                  backgroundColor: '#999',
                  borderRadius: '4px',
                }}
                key={code}
              >
                {code}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const RadioButtonInput = ({
  entryTypes,
  setOption,
  option,
}: {
  entryTypes: string[];
  setOption: Dispatch<SetStateAction<string>>;
  option: string;
}) => {
  const handleSelectOption = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      {entryTypes.map((type) => {
        return (
          <div key={type}>
            <input
              value={type}
              type='radio'
              checked={option === type}
              onChange={handleSelectOption}
            />
            <label>{type}</label>
          </div>
        );
      })}
    </div>
  );
};
