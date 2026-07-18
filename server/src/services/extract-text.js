const { PDFParse } = require('pdf-parse')
const mammoth = require('mammoth')

const extractText = async (buffer, mimetype) => {
  try {
    if (mimetype === 'application/pdf') {
      const parser = new PDFParse({ data: buffer })
      const result = await parser.getText()
      await parser.destroy()
      return result.text.trim()
    }

    if (
      mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({ buffer })
      return result.value.trim()
    }

    throw new Error('Unsupported file type for text extraction')
  } catch (err) {
    console.error(`Text extraction failed: ${err.message}`)
    throw new Error('Could not extract text from the uploaded file')
  }
}

module.exports = { extractText }
