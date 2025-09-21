import express, { Response } from 'express';
import { NonSensitivePatient } from '../types';
import patientService from '../services/patientService';

const route = express.Router();

route.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientService.getNonSensitiveEntries();
  res.json(data);
});

export default route;
