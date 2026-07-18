import NavBar from './components/navBar'
import CopyPasteBox from './components/cpyPaste-box'
import FeatureCardsSection from './components/lowerBoxes'

function App () {
  return (
    <div className='app-container'>
      <NavBar />

      <div className='flex flex-col items-center justify-center text-center px-6 pt-24'>
        <p className='text-black/90 text-[75px] mb-8'>Resumes lie. I don't. </p>
      </div>

      <div className='flex flex-col items-center justify-center text-center '>
        <CopyPasteBox />

        <button className='bg-black text-white px-6 py-3 my-5 rounded-lg text-xl hover:bg-neutral-800 transition duration-200'>
          Try It Now
        </button>
      </div>

      <FeatureCardsSection />
    </div>
  )
}

export default App
