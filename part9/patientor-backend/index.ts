import express from 'express';
const app = express();

app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_request, response) => {
  response.send('pong');
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
