import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import diagnosisService from '../../services/diagnosis';
import { Entry } from '../../types';
import { Favorite, HealthAndSafety, Work } from '@mui/icons-material';
import { AddEntryForm } from './AddEntryForm';

interface Props {
  patients: Patient[];
  setMessage: Dispatch<SetStateAction<string | null>>;
}

interface EntryProps {
  entry: Entry;
  diagnosis: Diagnosis[];
}

const PatientDetails = ({ patients, setMessage }: Props) => {
  const { id } = useParams();
  const [openForm, setOpenForm] = useState(false);
  const patient = patients.find((p) => p.id === id);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [patientEntries, setPatientEntries] = useState<Entry[]>([]);

  useEffect(() => {
    diagnosisService.getAll().then((data) => setDiagnosis(data));
    if (patient) {
      setPatientEntries(patient.entries);
    }
  }, [patient]);

  const openEntryForm = () => {
    setOpenForm(!openForm);
  };

  if (!patient || !id)
    return (
      <div>
        <h1>Error: Patient not found</h1>
      </div>
    );

  return (
    <div>
      <div>
        <h2>
          {patient.name}
          {patient.gender === 'female' ? (
            <FemaleIcon />
          ) : patient.gender === 'male' ? (
            <MaleIcon />
          ) : (
            <TransgenderIcon />
          )}
        </h2>
      </div>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <br />
      <button onClick={openEntryForm}>New Entry</button>
      {openForm && (
        <AddEntryForm
          setOpenForm={setOpenForm}
          userId={id}
          setMessage={setMessage}
          diagnosis={diagnosis}
          setPatientEntries={setPatientEntries}
        />
      )}
      <h3>entries</h3>
      {patientEntries.length > 0 ? (
        patientEntries.map((entry) => {
          return (
            <div
              style={{
                border: '1px solid',
                padding: '0 5px',
                borderRadius: '7px',
                marginBottom: '8px',
              }}
              key={entry.id}
            >
              <EntryDetails entry={entry} diagnosis={diagnosis} />
            </div>
          );
        })
      ) : (
        <div>
          <p>no entries available</p>
        </div>
      )}
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry; diagnosis: Diagnosis[] }> = ({
  entry,
  diagnosis,
}) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnosis={diagnosis} />;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntry entry={entry} diagnosis={diagnosis} />
      );
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnosis={diagnosis} />;
    default:
      return 'assertNever(entry)';
  }
};

const HospitalEntry = ({ entry, diagnosis }: EntryProps) => {
  if (entry.type === 'Hospital') {
    return (
      <div key={entry.id}>
        <p>
          {entry.date} <HealthAndSafety />
        </p>
        <p> {entry.description}</p>
        <div
          style={{
            border: '1px solid',
            borderRadius: '8px',
            padding: '0 5px',
            marginLeft: '5px',
          }}
        >
          <h4>discharge info</h4>
          <p>criteria: {entry.discharge.criteria}</p>
          <p>date: {entry.discharge.date}</p>
        </div>
        <p> diagnose by {entry.specialist}</p>
        <ul>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code}{' '}
                  {diagnosis.map((diag) =>
                    diag.code === code ? diag.name : null
                  )}
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  }
};

const HealthCheckEntry = ({ entry, diagnosis }: EntryProps) => {
  if (entry.type === 'HealthCheck') {
    const rating = entry.healthCheckRating;
    return (
      <div key={entry.id}>
        <p>
          {entry.date} <HealthAndSafety />
        </p>
        <p> {entry.description}</p>
        <p>
          <Favorite
            htmlColor={
              rating === 0
                ? 'green'
                : rating === 1
                ? 'yellow'
                : rating === 2
                ? 'orange'
                : 'red'
            }
          />
        </p>
        <p> diagnose by {entry.specialist}</p>
        <ul>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code}{' '}
                  {diagnosis.map((diag) =>
                    diag.code === code ? diag.name : null
                  )}
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  }
};

const OccupationalHealthcareEntry = ({ entry, diagnosis }: EntryProps) => {
  if (entry.type === 'OccupationalHealthcare') {
    return (
      <div key={entry.id}>
        <div>
          <h4>Employer: {entry.employerName}</h4>
          <div
            style={{
              border: '1px solid',
              borderRadius: '8px',
              marginLeft: '5px',
              padding: '0 5px',
            }}
          >
            <p>Sick leave? {entry.sickLeave ? 'Yes' : 'No'}</p>
            {entry.sickLeave ? (
              <div>
                <p>Start Date: {entry.sickLeave.startDate}</p>
                <p>End Date: {entry.sickLeave.endDate}</p>
              </div>
            ) : null}
          </div>
        </div>
        <p>
          {entry.date} <Work />
        </p>
        <p> {entry.description}</p>

        <p> diagnose by {entry.specialist}</p>
        <ul>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code}{' '}
                  {diagnosis.map((diag) =>
                    diag.code === code ? diag.name : null
                  )}
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  }
};

export default PatientDetails;
