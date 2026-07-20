function RoastModal ({ result, onClose }) {
  if (!result) return null

  return (
    <div
      onClick={onClose}
      className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'
    >
      <div
        onClick={e => e.stopPropagation()}
        className='bg-white rounded-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-10 relative'
      >
        <button
          onClick={onClose}
          className='absolute top-5 right-5 text-black/50 hover:text-black text-3xl'
        >
        </button>

        <div className='flex gap-12 mb-8'>
          <div>
            <span className='text-5xl font-bold'>{result.overallScore}</span>
            <p className='text-black/60 text-base'>Overall Score</p>
          </div>
          <div>
            <span className='text-5xl font-bold'>{result.atsScore}</span>
            <p className='text-black/60 text-base'>ATS Score</p>
          </div>
        </div>

        <p className='text-xl mb-8'>{result.roastSummary}</p>

        <h3 className='text-2xl font-bold mb-3'>Strengths</h3>
        <ul className='list-disc list-inside mb-8 text-lg space-y-1'>
          {result.strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <h3 className='text-2xl font-bold mb-3'>Weaknesses</h3>
        {result.weaknesses.map((w, i) => (
          <div key={i} className='mb-6'>
            <p className='text-lg font-semibold'>{w.issue}</p>
            <p className='text-lg italic text-black/70'>"{w.roast}"</p>
            <p className='text-lg text-black/60'>Fix: {w.fix}</p>
          </div>
        ))}

        <p className='text-2xl font-bold mt-6 pt-6 border-t border-black/10'>
          {result.verdict}
        </p>
      </div>
    </div>
  )
}

export default RoastModal