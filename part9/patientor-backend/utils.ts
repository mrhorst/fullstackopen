import { NewPatientEntry } from './types';
import { z } from 'zod';

export const newPatientEntrySchema = z.object({
  name: z.string(),
  ssn: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string(),
  occupation: z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPatientEntrySchema.parse(object);
};
