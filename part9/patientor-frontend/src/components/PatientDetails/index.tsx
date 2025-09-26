import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface Props {
  patients: Patient[];
}

const PatientDetails = ({ patients }: Props) => {
  const { id } = useParams();
  const patient = patients.find((p) => p.id === id);

  if (!patient)
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
      <h3>entries</h3>
      {patient.entries.length > 0 ? (
        patient.entries.map((entry) => {
          return (
            <div key={entry.id}>
              <p>
                {entry.date} {entry.description}
              </p>
              <ul>
                {entry.diagnosisCodes
                  ? entry.diagnosisCodes.map((code) => (
                      <li key={code}>{code}</li>
                    ))
                  : null}
              </ul>
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
export default PatientDetails;
