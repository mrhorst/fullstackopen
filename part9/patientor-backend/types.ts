import { z } from 'zod';
import { newPatientEntrySchema } from './utils';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NewPatientEntry = z.infer<typeof newPatientEntrySchema>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
