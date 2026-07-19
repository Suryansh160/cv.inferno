import { useState } from 'react'
import NavBar from './components/navBar'
import CopyPasteBox from './components/cpyPaste-box'
import FeatureCardsSection from './components/lowerBoxes'
import RoastModal from './components/dialogueBox'
import { roastResume } from './api/resumeapi'

function App () {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const handleFileSelect = selectedFile => {
    setFile(selectedFile)
    setResult(null)
    setError(null)
  }

  const handleRoast = async () => {
    if (!file) {
      setError('Upload a resume first.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await roastResume(file)
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='app-container'>
      <NavBar />

      <div className='flex flex-col items-center justify-center text-center px-6 pt-24'>
        <p className='text-black/90 text-[75px] mb-8'>Resumes lie. I don't. </p>
      </div>

      <div className='flex flex-col items-center justify-center text-center '>
        <CopyPasteBox onFileSelect={handleFileSelect} />

        <button
          onClick={handleRoast}
          disabled={loading}
          className='bg-black text-white px-6 py-3 my-5 rounded-lg text-xl hover:bg-neutral-800 transition duration-200 disabled:opacity-50'
        >
          {loading ? 'Roasting...' : 'Try It Now'}
        </button>

        {error && <p className='text-red-600'>{error}</p>}
      </div>

      <FeatureCardsSection />

      <RoastModal result={result} onClose={() => setResult(null)} />
    </div>
  )
}

export default App