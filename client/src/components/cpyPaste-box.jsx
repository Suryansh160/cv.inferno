import { useState, useRef } from 'react'

function CopyPasteBox ({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleDragOver = e => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = e => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      onFileSelect?.(droppedFile)
    }
  }

  const handleFileSelect = e => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      onFileSelect?.(selectedFile)
    }
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-full max-w-3xl h-80 border-2 border-dashed backdrop-blur-md rounded-xl p-14 flex flex-col items-center justify-start cursor-pointer transition ${
        isDragging
          ? 'border-black/60 bg-black/5'
          : 'border-black/30 hover:border-black/50'
      }`}
    >
      <input
        ref={fileInputRef}
        type='file'
        onChange={handleFileSelect}
        className='hidden'
        accept='.pdf'
      />
      <span className='text-2xl mb-3 text-black/70'>
        Your AI Resume Coach. Upload your resume to uncover hidden weaknesses,
        optimize for ATS, and maximize your interview chances.
      </span>
      <p className='text-black/70 text-2xl py-15'>
        {file ? file.name : 'Drop your Resume here'}
      </p>
    </div>
  )
}

export default CopyPasteBox
