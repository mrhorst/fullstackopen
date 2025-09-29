import express, { Response } from 'express';
import { Patient } from '../types';
import patientService from '../services/patientService';
import { EntryWithoutIdSchema, toNewPatientEntry } from '../utils';
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

route.post('/:id/entries', (req, res) => {
  try {
    const patientId = req.params.id;
    const parsedEntry = EntryWithoutIdSchema.parse(req.body);
    const createdEntry = patientService.addEntryToPatient(
      patientId,
      parsedEntry
    );
    return res.status(201).json(createdEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .send({ error: { issues: error.issues, name: error.name } });
    } else {
      return res.status(400).send({ error: 'error unknown' });
    }
  }
});

export default route;
