const express = require('express')
require('express-async-errors')
const config = require('../utils/config')
const cors = require('cors')
const mongoose = require('mongoose')
const ordersRouter = require('../controllers/orders')
const usersRouter = require('../controllers/users')
// const middleware = require('./utils/middleware')

// const logger = require('./utils/logger')
const app = express()

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/users', usersRouter)

app.use('/api/orders', ordersRouter)

/*
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
*/

module.exports = app