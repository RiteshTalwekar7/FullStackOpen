import express from 'express'
import mongoose from 'mongoose'
import config from './utils/config.js'
import logger from './utils/logger.js'
import blogRouter from './controllers/blog-routes.js'
import middleware from './utils/middleware.js'

const app = express()

logger.info('connecting to ', config.MONGODB_URL)

mongoose
  .connect(config.MONGODB_URL, { family: 4 })
  .then(() => {
    logger.info(`Connected to MongoDB: ${config.MONGODB_URL}`)
  })
  .catch(error => {
    logger.error(error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app