const { extractText } = require('../services/extract-text')
const { generateRoast } = require('../services/gemini-service')

const roastResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "No resume file uploaded. Attach a PDF or DOCX under field 'resume'."
      })
    }

    const resumeText = await extractText(req.file.buffer, req.file.mimetype)

    if (!resumeText || resumeText.length < 50) {
      return res.status(422).json({
        success: false,
        message:
          "Couldn't extract meaningful text from this file. Is it a scanned image?"
      })
    }

    console.log(
      `Roasting resume: ${req.file.originalname} (${resumeText.length} chars)`
    )

    const roast = await generateRoast(resumeText)

    return res.status(200).json({
      success: true,
      data: {
        fileName: req.file.originalname,
        ...roast
      }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { roastResume }
