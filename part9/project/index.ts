import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('hello full stack');
});

app.get('/bmi', (request, response) => {
  const height = Number(request.query.height);
  const weight = Number(request.query.weight);

  try {
    const result = calculateBmi(height, weight);
    response.json({
      height,
      weight,
      bmi: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(400).send({
        error: 'malformatted parameters',
        message: error.message,
      });
    }
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (target === undefined || daily_exercises === undefined) {
    res.status(400).send({ error: 'parameters missing' });
  }

  try {
    if (typeof target !== 'number') {
      throw new Error('target not a number');
    }
    for (const item of daily_exercises) {
      if (typeof item !== 'number' || isNaN(item)) {
        throw new Error('array contains non-number items');
      }
    }

    // eslint-disable-next-line
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: 'malformatted parameters' });
    }
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
