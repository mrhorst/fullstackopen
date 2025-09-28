import { HealthCheckRating, NewPatientEntry } from './types';
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

//helpers
const stringNotEmpty = z.string().min(1, 'Required');

const diagnosisCodesSchema = z.array(stringNotEmpty).optional();

const BaseEntryWithoutIdSchema = z.object({
  description: stringNotEmpty,
  date: stringNotEmpty,
  specialist: stringNotEmpty,
  diagnosisCodes: diagnosisCodesSchema,
});

const HealthCheckEntryWithoutIdSchema = BaseEntryWithoutIdSchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.enum(HealthCheckRating),
});

const DischargeSchema = z
  .object({
    date: stringNotEmpty,
    criteria: stringNotEmpty,
  })
  .optional();

const HospitalEntryWithoutIdSchema = BaseEntryWithoutIdSchema.extend({
  type: z.literal('Hospital'),
  discharge: DischargeSchema,
});

const SickLeaveSchema = z
  .object({
    startDate: stringNotEmpty,
    endDate: stringNotEmpty,
  })
  .optional();

const OccupationalHealthcareEntryWithoutIdSchema =
  BaseEntryWithoutIdSchema.extend({
    type: z.literal('OccupationalHealthcare'),
    employerName: stringNotEmpty,
    sickLeave: SickLeaveSchema,
  });

export const EntryWithoutIdSchema = z.union([
  HealthCheckEntryWithoutIdSchema,
  HospitalEntryWithoutIdSchema,
  OccupationalHealthcareEntryWithoutIdSchema,
]);

export type EntryWithoutId = z.infer<typeof EntryWithoutIdSchema>;
