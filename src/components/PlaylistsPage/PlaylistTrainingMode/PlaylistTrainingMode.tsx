import { useParams, useNavigate } from 'react-router-dom'
import { usePlaylistStore } from '@store/playlistStore.ts'
import BackArrowButton from '@components/BackArrowButton/BackArrowButton.tsx'
import { useState, useEffect } from 'react'
import type { CardStatus } from '@/types/playlist'

interface Card {
  id: string
  word: string
  translation: string
  status: CardStatus
}

const PlaylistTrainingMode = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const playlist = usePlaylistStore(state => state.playlists.find(p => p.id === id))
  const updateCardStatus = usePlaylistStore(state => state.updateCardStatus)
  const getAvailableCards = usePlaylistStore(state => state.getAvailableCards)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [shuffledCards, setShuffledCards] = useState<Card[]>([])
  const [shownCards, setShownCards] = useState<Set<string>>(new Set())
  const [isAnimating, setIsAnimating] = useState(false)
  const [prevCardIndex, setPrevCardIndex] = useState<number | null>(null)
  const [transitioningTo, setTransitioningTo] = useState<number | null>(null)
  const [transitionStage, setTransitionStage] = useState<'idle' | 'start' | 'animating'>('idle')

  useEffect(() => {
    if (playlist) {
      const availableCards = getAvailableCards(playlist.id)
      const shuffled = [...availableCards].sort(() => Math.random() - 0.5)
      setShuffledCards(shuffled)
      setCurrentCardIndex(0)
      setShownCards(new Set())
    }
  }, [playlist, getAvailableCards])

  useEffect(() => {
    setIsFlipped(false)
  }, [currentCardIndex])

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

  const handleLearnCardFlip = () => {
    setIsFlipped(f => !f)
  }

  const handleLearnCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleLearnCardFlip()
    }
  }

  const handleCardAction = (isKnown: boolean) => {
    if (!playlist) return

    const currentCard = shuffledCards[currentCardIndex]

    if (isKnown) {
      const newStatus = currentCard.status === 'new' ? 'learning' : 'mastered'
      updateCardStatus(playlist.id, currentCard.id, newStatus)
    }

    setShownCards(prev => new Set([...prev, currentCard.id]))

    if (currentCardIndex + 1 >= shuffledCards.length) {
      navigate(`/playlist/${playlist.id}`)
      return
    }

    setIsAnimating(true)
    setTransitionStage('start')
    setPrevCardIndex(currentCardIndex)
    setTransitioningTo(currentCardIndex + 1)

    requestAnimationFrame(() => {
      setTransitionStage('animating')
    })

    setTimeout(() => {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsAnimating(false)
      setPrevCardIndex(null)
      setTransitioningTo(null)
      setTransitionStage('idle')
      setIsFlipped(false)
    }, 300)
  }

  const renderLearnMode = () => {
    const currentCard = shuffledCards[currentCardIndex]
    const showTransition = isAnimating && prevCardIndex !== null && transitioningTo !== null
    const incomingCard = showTransition ? shuffledCards[transitioningTo] : null

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-[35rem] h-[25rem]">
          {showTransition && incomingCard && (
            <div
              className="absolute w-[35rem] h-[25rem] z-20"
              style={{
                left: '50%',
                top: 0,
                transform: 'translateX(-50%)',
                opacity: transitionStage === 'start' ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out',
              }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center rounded-2xl bg-white shadow-2xl border border-gray-200 p-8">
                <h3 className="text-3xl font-bold mb-6">Word</h3>
                <p className="text-5xl text-gray-800 font-semibold">{incomingCard.word}</p>
                <p className="text-base text-gray-500 mt-8">Click or press Enter/Space to flip</p>
              </div>
            </div>
          )}

          {!isAnimating && (
            <div
              className="w-full h-full"
              style={{
                opacity: transitionStage === 'start' ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out',
              }}
            >
              <div
                className="w-full h-full cursor-pointer"
                tabIndex={0}
                aria-label={
                  isFlipped
                    ? `Show word for ${currentCard.translation}`
                    : `Show translation for ${currentCard.word}`
                }
                onClick={handleLearnCardFlip}
                onKeyDown={handleLearnCardKeyDown}
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  <div
                    className="absolute w-full h-full flex flex-col items-center justify-center rounded-2xl bg-white shadow-2xl border border-gray-200 backface-hidden p-8"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <h3 className="text-3xl font-bold mb-6">Word</h3>
                    <p className="text-5xl text-gray-800 font-semibold">{currentCard.word}</p>
                    <p className="text-base text-gray-500 mt-8">
                      Click or press Enter/Space to flip
                    </p>
                  </div>
                  <div
                    className="absolute w-full h-full flex flex-col items-center justify-center rounded-2xl bg-blue-50 shadow-2xl border border-blue-200 rotate-y-180 backface-hidden p-8"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <h3 className="text-3xl font-bold mb-6">Translation</h3>
                    <p className="text-5xl text-blue-700 font-semibold">
                      {currentCard.translation}
                    </p>
                    <p className="text-base text-gray-500 mt-8">
                      Click or press Enter/Space to flip
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-gray-600 text-lg font-medium mt-8">
          {currentCardIndex + 1} of {shuffledCards.length}
        </div>

        {isFlipped && (
          <div className="flex gap-8 mt-8 px-8">
            <button
              onClick={() => handleCardAction(false)}
              className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-lg font-medium"
            >
              Don't Know
            </button>
            <button
              onClick={() => handleCardAction(true)}
              className="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg font-medium"
            >
              Know
            </button>
          </div>
        )}
      </div>
    )
  }

  const renderCompletionMessage = () => (
    <div className="flex flex-col items-center justify-center gap-6">
      <h2 className="text-3xl font-bold text-gray-900">Training Complete!</h2>
      <p className="text-xl text-gray-600">You've gone through all the cards in this playlist.</p>
      <button
        onClick={() => (window.location.href = `/playlist/${playlist?.id}`)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Return to Playlist
      </button>
    </div>
  )

  if (shownCards.size === shuffledCards.length && shuffledCards.length > 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto min-h-auto">
          <div className="flex justify-between items-center mb-6">
            <BackArrowButton pathTo={`/playlist/${playlist?.id}`} buttonText="Back to playlist" />
          </div>
          {renderCompletionMessage()}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto min-h-auto">
        <div className="flex justify-between items-center mb-6">
          <BackArrowButton pathTo={`/playlist/${playlist.id}`} buttonText="Back to playlist" />
        </div>

        <div className="mb-8">{renderLearnMode()}</div>
      </div>
    </div>
  )
}

export default PlaylistTrainingMode
