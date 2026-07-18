const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const SYSTEM_PROMPT = `You are a brutally honest resume reviewer for a "Resume Roaster" app.
Given raw resume text, roast it — be witty, sharp, and unfiltered, but ultimately useful.
Return ONLY valid JSON (no markdown fences, no preamble) matching this exact shape:

{
  "overallScore": <integer 0-100, ATS + quality combined>,
  "atsScore": <integer 0-100, how well this would survive an Applicant Tracking System>,
  "roastSummary": "<2-4 sentence savage but funny overall roast>",
  "strengths": ["<short strength 1>", "<short strength 2>"],
  "weaknesses": [
    { "issue": "<what's wrong>", "roast": "<witty one-liner roasting it>", "fix": "<concrete fix>" }
  ],
  "verdict": "<one blunt closing line: hire-worthy or needs work>"
}

Keep weaknesses to 3-6 items. Be honest about real issues (weak verbs, vague metrics, formatting problems, generic objectives, etc). Never invent facts not present in the resume text.`

const generateRoast = async resumeText => {
  try {
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT
    })

    const result = await model.generateContent(
      `Here is the resume text to roast:\n\n${resumeText}`
    )

    const rawText = result.response.text().trim()
    const cleaned = rawText.replace(/```json|```/g, '').trim()
    return JSON.parse(cleaned)
  } catch (err) {
    console.error(`AI roast generation failed: ${err.message}`)
    throw new Error('Failed to generate roast from AI service')
  }
}

module.exports = { generateRoast }
