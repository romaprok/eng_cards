import { useParams, useNavigate } from 'react-router-dom'
import { usePlaylistStore } from '@store/playlistStore'
import BackArrowButton from '@components/BackArrowButton/BackArrowButton'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { CardStatus, DifficultyRating } from '@/types/playlist'
import LearnMode from '@components/PlaylistsPage/PlaylistTrainingMode/LearnMode'
import PlaylistTrainingModeEmptyState from '@components/PlaylistsPage/PlaylistTrainingMode/PlaylistTrainingModeEmptyState/PlaylistTrainingModeEmptyState'

interface Card {
  id: string
  word: string
  translation: string
  status: CardStatus
  easeFactor?: number
  interval?: number
  repetitions?: number
  totalReviews?: number
  correctReviews?: number
  successRate?: number
}

const PlaylistTrainingPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const playlist = usePlaylistStore(state => state.playlists.find(p => p.id === id))
  const updateCardWithRating = usePlaylistStore(state => state.updateCardWithRating)
  const getAvailableCards = usePlaylistStore(state => state.getAvailableCards)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [shuffledCards, setShuffledCards] = useState<Card[]>([])
  const [shownCards, setShownCards] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (playlist) {
      const availableCards = getAvailableCards(playlist.id)
      const shuffled = [...availableCards].sort(() => Math.random() - 0.5)
      setShuffledCards(shuffled)
      setCurrentCardIndex(0)
      setShownCards(new Set())
    }
  }, [playlist?.id])

  useEffect(() => {
    setIsFlipped(false)
  }, [currentCardIndex])

  const handleLearnCardFlip = () => {
    setIsFlipped(f => !f)
  }

  const handleLearnCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleLearnCardFlip()
    }
  }

  const handleCardAction = useCallback(
    (rating: DifficultyRating) => {
      if (!playlist) return

      const currentCard = shuffledCards[currentCardIndex]

      // Update card using SM-2 algorithm
      updateCardWithRating(playlist.id, currentCard.id, rating)

      setShownCards(prev => new Set([...prev, currentCard.id]))

      if (currentCardIndex + 1 >= shuffledCards.length) {
        void navigate(`/playlist/${playlist.id}`)
        return
      }

      // Move to next card
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex + 1)
        setIsFlipped(false)
      }, 200)
    },
    [playlist, shuffledCards, currentCardIndex, updateCardWithRating, navigate]
  )

  // Add keyboard shortcuts for rating buttons
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFlipped) return

      switch (e.key) {
        case '1':
          e.preventDefault()
          handleCardAction('again')
          break
        case '2':
          e.preventDefault()
          handleCardAction('hard')
          break
        case '3':
          e.preventDefault()
          handleCardAction('good')
          break
        case '4':
          e.preventDefault()
          handleCardAction('easy')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFlipped, handleCardAction])

  const renderCompletionMessage = () => (
    <motion.div
      className="flex flex-col items-center justify-center gap-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center">🎉 Training Complete!</h2>
      </motion.div>
      <motion.p
        className="text-xl text-gray-600 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        You've gone through all the cards in this playlist.
      </motion.p>
      <motion.button
        onClick={() => (window.location.href = `/playlist/${playlist?.id}`)}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg"
        whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)' }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
      >
        Return to Playlist
      </motion.button>
    </motion.div>
  )

  if (!playlist) {
    return (
      <motion.div
        className="flex flex-col min-h-screen bg-gray-50 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto min-h-auto">
          <BackArrowButton pathTo="/" buttonText="Back to playlists" />
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8 mt-8 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Playlist not found</h2>
            <p className="text-gray-500">The playlist you are looking for does not exist.</p>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  if (shuffledCards.length === 0) {
    return <PlaylistTrainingModeEmptyState playlistId={playlist.id} />
  }

  if (shownCards.size === shuffledCards.length && shuffledCards.length > 0) {
    return (
      <motion.div
        className="flex flex-col min-h-screen bg-gray-50 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto min-h-auto">
          <motion.div
            className="flex justify-between items-center mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <BackArrowButton pathTo={`/playlist/${playlist?.id}`} buttonText="Back to playlist" />
          </motion.div>
          {renderCompletionMessage()}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gray-50 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto min-h-auto">
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <BackArrowButton pathTo={`/playlist/${playlist.id}`} buttonText="Back to playlist" />
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <LearnMode
            currentCard={shuffledCards[currentCardIndex]}
            isFlipped={isFlipped}
            handleLearnCardFlip={handleLearnCardFlip}
            handleLearnCardKeyDown={handleLearnCardKeyDown}
            shuffledCards={shuffledCards}
            currentCardIndex={currentCardIndex}
            handleCardAction={handleCardAction}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PlaylistTrainingPage
