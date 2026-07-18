const multer = require('multer')

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err)

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message:
        err.code === 'LIMIT_FILE_SIZE'
          ? 'File too large. Max upload size exceeded.'
          : err.message
    })
  }

  if (err.message === 'Only PDF and DOCX files are allowed') {
    return res.status(400).json({ success: false, message: err.message })
  }

  const statusCode = err.statusCode || 500
  return res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal server error' : err.message
  })
}

module.exports = errorHandler
