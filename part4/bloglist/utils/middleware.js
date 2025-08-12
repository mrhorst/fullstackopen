const logger = require('../utils/logger')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message })
  }

  logger.error(error.message)

  next(error)
}

module.exports = { unknownEndpoint, errorHandler }
