const logger = require('../utils/logger')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    response.status(403).json({ error: error.message })
  } else if (error.name === 'CastError') {
    response.status(400).json({ error: 'malformatted id' })
  }

  logger.error('OUR MIDDLEWARE DID NOT CATCH THIS ONE. PLEASE FIX:', error)

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor }
