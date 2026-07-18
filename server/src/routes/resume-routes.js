const express = require('express')
const upload = require('../middlewares/upload-middleware')
const { roastResume } = require('../controllers/resume-controller')

const router = express.Router()

router.post('/roast', upload.single('resume'), roastResume)

module.exports = router
