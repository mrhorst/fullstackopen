import { z } from 'zod';
import { newPatientEntrySchema } from './utils';
import { UUIDTypes } from 'uuid';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: UUIDTypes;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: 'male' | 'female' | 'other';
  occupation: string;
  entries: Entry[];
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface BaseEntry {
  id: UUIDTypes;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}
export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export type NewPatientEntry = z.infer<typeof newPatientEntrySchema>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
