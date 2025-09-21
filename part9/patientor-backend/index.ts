import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosis';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use('/api/diagnosis', diagnosisRouter);

app.get('/api/ping', (_request, response) => {
  response.send('pong');
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
