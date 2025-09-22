import { Gender, NewPatientEntry } from './types';

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('incorrect or missing data');
  }
  if (
    'name' in object &&
    'gender' in object &&
    'dateOfBirth' in object &&
    'occupation' in object &&
    'ssn' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      gender: parseGender(object.gender),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
    };
    return newEntry;
  }
  throw new Error('incorrect or missing data: fields are missing..');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('incorrect or missing date: ' + date);
  }
  return date;
};

const parseName = (name: unknown) => {
  if (!isString(name)) {
    throw new Error('incorrect or missing name: ' + name);
  }
  return name;
};

const parseOccupation = (occ: unknown) => {
  if (!isString(occ)) {
    throw new Error('incorrect or missing occupation: ' + occ);
  }
  return occ;
};

const parseSsn = (ssn: unknown) => {
  if (!isString(ssn)) {
    throw new Error('incorrect or missing occupation: ' + ssn);
  }
  return ssn;
};
