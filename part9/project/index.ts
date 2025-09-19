import express from 'express'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('hello full stack')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
