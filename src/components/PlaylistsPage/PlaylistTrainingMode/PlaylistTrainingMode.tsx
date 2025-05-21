import { useParams, useNavigate } from 'react-router-dom'
import { usePlaylistStore } from '@store/playlistStore.ts'
import BackArrowButton from '@components/BackArrowButton/BackArrowButton.tsx'
import { useState, useEffect } from 'react'
import type { CardStatus } from '@/types/playlist'
import LearnMode from './LearnMode'

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
    // Save current state to card history

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

        <div className="mb-8">
          <LearnMode
            currentCard={shuffledCards[currentCardIndex]}
            isFlipped={isFlipped}
            handleLearnCardFlip={handleLearnCardFlip}
            handleLearnCardKeyDown={handleLearnCardKeyDown}
            isAnimating={isAnimating}
            prevCardIndex={prevCardIndex}
            transitioningTo={transitioningTo}
            transitionStage={transitionStage}
            shuffledCards={shuffledCards}
            currentCardIndex={currentCardIndex}
            handleCardAction={handleCardAction}
          />
        </div>
      </div>
    </div>
  )
}

export default PlaylistTrainingMode
