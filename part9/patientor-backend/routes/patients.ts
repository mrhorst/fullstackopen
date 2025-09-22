import express, { Response } from 'express';
import { NonSensitivePatient } from '../types';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const route = express.Router();

route.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientService.getNonSensitiveEntries();
  res.json(data);
});

route.post('/', (req, res) => {
  try {
    const patientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(patientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'something went wrong: ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default route;
