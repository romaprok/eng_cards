import { useParams } from 'react-router-dom'
import { usePlaylistStore } from '@store/playlistStore.ts'
import BackArrowButton from '@components/BackArrowButton/BackArrowButton.tsx'
import { useState, useEffect } from 'react'

type TrainingMode = 'learn' | 'write' | 'test'

interface Card {
  id: string
  word: string
  translation: string
}

const PlaylistTrainingMode = () => {
  const { id } = useParams<{ id: string }>()
  const playlist = usePlaylistStore(state => state.playlists.find(p => p.id === id))
  const [currentMode, setCurrentMode] = useState<TrainingMode>('learn')
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [shuffledCards, setShuffledCards] = useState<Card[]>([])

  useEffect(() => {
    if (playlist) {
      // Shuffle cards for training
      const shuffled = [...playlist.cards].sort(() => Math.random() - 0.5)
      setShuffledCards(shuffled)
    }
  }, [playlist])

  if (!playlist) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto min-h-auto">
          <BackArrowButton pathTo="/" buttonText="Back to playlists" />
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Playlist not found</h2>
            <p className="text-gray-500">The playlist you are looking for does not exist.</p>
          </div>
        </div>
      </div>
    )
  }

  if (shuffledCards.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto min-h-auto">
          <BackArrowButton pathTo={`/playlist/${playlist.id}`} buttonText="Back to playlist" />
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No cards in this playlist</h2>
            <p className="text-gray-500">Please add some words to start training.</p>
          </div>
        </div>
      </div>
    )
  }

  const currentCard = shuffledCards[currentCardIndex]

  const handleNext = () => {
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1)
      setIsFlipped(false)
      setUserAnswer('')
      setIsCorrect(null)
    }
  }

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1)
      setIsFlipped(false)
      setUserAnswer('')
      setIsCorrect(null)
    }
  }

  const handleCheckAnswer = () => {
    if (currentMode === 'write') {
      const isAnswerCorrect =
        userAnswer.toLowerCase().trim() === currentCard.translation.toLowerCase().trim()
      setIsCorrect(isAnswerCorrect)
      if (isAnswerCorrect) {
        setScore(prev => prev + 1)
      }
    }
  }

  const renderModeSelector = () => (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => setCurrentMode('learn')}
        className={`px-4 py-2 rounded-md ${
          currentMode === 'learn'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Learn
      </button>
      <button
        onClick={() => setCurrentMode('write')}
        className={`px-4 py-2 rounded-md ${
          currentMode === 'write'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Write
      </button>
      <button
        onClick={() => setCurrentMode('test')}
        className={`px-4 py-2 rounded-md ${
          currentMode === 'test'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Test
      </button>
    </div>
  )

  const renderLearnMode = () => (
    <div
      className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">{isFlipped ? 'Translation' : 'Word'}</h3>
        <p className="text-3xl text-gray-800">
          {isFlipped ? currentCard.translation : currentCard.word}
        </p>
        <p className="text-sm text-gray-500 mt-4">Click to flip</p>
      </div>
    </div>
  )

  const renderWriteMode = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Write the translation</h3>
        <p className="text-3xl text-gray-800 mb-6">{currentCard.word}</p>
        <input
          type="text"
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter translation"
        />
        {isCorrect !== null && (
          <p className={`mt-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? 'Correct!' : `Incorrect. The answer is: ${currentCard.translation}`}
          </p>
        )}
        <button
          onClick={handleCheckAnswer}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Check
        </button>
      </div>
    </div>
  )

  const renderTestMode = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Multiple Choice</h3>
        <p className="text-3xl text-gray-800 mb-6">{currentCard.word}</p>
        <div className="grid grid-cols-2 gap-4">
          {[currentCard.translation, ...getRandomTranslations()]
            .sort(() => Math.random() - 0.5)
            .map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="p-4 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {option}
              </button>
            ))}
        </div>
      </div>
    </div>
  )

  const getRandomTranslations = () => {
    const otherCards = shuffledCards.filter(card => card.id !== currentCard.id)
    return otherCards
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(card => card.translation)
  }

  const handleAnswer = (answer: string) => {
    const isAnswerCorrect = answer === currentCard.translation
    setIsCorrect(isAnswerCorrect)
    if (isAnswerCorrect) {
      setScore(prev => prev + 1)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto min-h-auto">
        <div className="flex justify-between items-center mb-6">
          <BackArrowButton pathTo={`/playlist/${playlist.id}`} buttonText="Back to playlist" />
          <div className="text-lg font-semibold">
            Score: {score}/{currentCardIndex + 1}
          </div>
        </div>

        {renderModeSelector()}

        <div className="mb-8">
          {currentMode === 'learn' && renderLearnMode()}
          {currentMode === 'write' && renderWriteMode()}
          {currentMode === 'test' && renderTestMode()}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentCardIndex === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <div className="text-gray-600">
            {currentCardIndex + 1} of {shuffledCards.length}
          </div>
          <button
            onClick={handleNext}
            disabled={currentCardIndex === shuffledCards.length - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaylistTrainingMode
