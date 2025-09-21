import diagnosisData from '../data/diagnosis';
import { Diagnosis } from '../types';

const getDiagnosis = (): Diagnosis[] => {
  return diagnosisData;
};

export default {
  getDiagnosis,
};
