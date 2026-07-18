const express = require('express')
const cors = require('cors')
const resumeRoutes = require('./routes/resume-routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (req, res) => {
  res
    .status(200)
    .json({ success: true, message: 'resume-roaster-service is up' })
})

app.use('/api/resume', resumeRoutes)

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

app.use(errorHandler)

module.exports = app
