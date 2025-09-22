import express, { Response } from 'express';
import { NonSensitivePatient } from '../types';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';
import { z } from 'zod';

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
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'error unknown' });
    }
  }
});

export default route;
