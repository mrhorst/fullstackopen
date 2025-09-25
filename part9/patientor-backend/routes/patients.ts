import express, { Response } from 'express';
import { Patient } from '../types';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';
import { z } from 'zod';

const route = express.Router();

route.get('/', (_req, res: Response<Patient[]>) => {
  const data = patientService.getEntries();
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

route.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.findById(id);
  res.json(patient);
});

export default route;
