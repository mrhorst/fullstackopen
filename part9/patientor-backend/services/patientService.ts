import patients from '../data/patients';
import { Entry, NewPatientEntry, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';
import { EntryWithoutId } from '../utils';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatientEntry = { id, ...entry, entries: [] };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string) => {
  return patients.find((patient) => patient.id === id);
};

const addEntryToPatient = (
  patientId: string,
  entryWithoutId: EntryWithoutId
): Entry => {
  const patient = findById(patientId);
  if (!patient) {
    throw new Error('patient not found');
  }
  const newEntry: Entry = {
    id: uuid(),
    ...entryWithoutId,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  findById,
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  addEntryToPatient,
};
