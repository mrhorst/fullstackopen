import express, { Response } from 'express';
import { NewPatientEntry, NonSensitivePatient } from '../types';
import patientService from '../services/patientService';

const route = express.Router();

route.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientService.getNonSensitiveEntries();
  res.json(data);
});

route.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const patientEntry: NewPatientEntry = req.body;

  const addedEntry = patientService.addPatient(patientEntry);
  res.json(addedEntry);
});

export default route;
