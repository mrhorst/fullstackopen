import express from 'express'
import calculateBmi from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('hello full stack')
})

app.get('/bmi', (request, response) => {
  const height = Number(request.query.height)
  const weight = Number(request.query.weight)

  try {
    const result = calculateBmi(height, weight)
    response.json({
      height,
      weight,
      bmi: result,
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(400).send({
        error: 'malformatted parameters',
        message: error.message,
      })
    }
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
