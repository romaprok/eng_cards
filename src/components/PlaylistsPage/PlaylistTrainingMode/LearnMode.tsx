import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CardStatus, DifficultyRating } from '@/types/playlist'
import AnimatedFlipCard from './AnimatedFlipCard'

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

interface LearnModeProps {
  currentCard: Card
  isFlipped: boolean
  handleLearnCardFlip: () => void
  handleLearnCardKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
  shuffledCards: Card[]
  currentCardIndex: number
  handleCardAction: (rating: DifficultyRating) => void
}

const LearnMode: React.FC<LearnModeProps> = ({
  currentCard,
  isFlipped,
  handleLearnCardFlip,
  handleLearnCardKeyDown,
  shuffledCards,
  currentCardIndex,
  handleCardAction,
}) => {
  const formatInterval = (days: number): string => {
    if (days < 1) return 'Today'
    if (days === 1) return '1 day'
    if (days < 30) return `${days} days`
    if (days < 365) return `${Math.round(days / 30)} months`
    return `${Math.round(days / 365)} years`
  }

  // Safely access card properties with defaults
  const safeCard = {
    ...currentCard,
    easeFactor: currentCard.easeFactor ?? 2.5,
    interval: currentCard.interval ?? 1,
    repetitions: currentCard.repetitions ?? 0,
    totalReviews: currentCard.totalReviews ?? 0,
    correctReviews: currentCard.correctReviews ?? 0,
    successRate: currentCard.successRate ?? 0,
  }

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Card Container */}
      <div className="relative w-[35rem] h-[25rem] mb-8">
        <AnimatedFlipCard
          card={safeCard}
          isFlipped={isFlipped}
          onFlip={handleLearnCardFlip}
          onKeyDown={handleLearnCardKeyDown}
        />
      </div>

      {/* Card Statistics */}
      {isFlipped && safeCard.totalReviews > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center text-sm text-gray-600"
        >
          <div className="flex gap-4 justify-center">
            <span>Success Rate: {safeCard.successRate.toFixed(1)}%</span>
            <span>Reviews: {safeCard.totalReviews}</span>
            <span>Repetitions: {safeCard.repetitions}</span>
          </div>
        </motion.div>
      )}

      {/* Progress indicator with animation */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="text-gray-600 text-lg font-medium"
            key={currentCardIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {currentCardIndex + 1} of {shuffledCards.length}
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentCardIndex + 1) / shuffledCards.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Difficulty-based action buttons */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1],
              type: 'tween',
            }}
            className="flex gap-4 px-8 items-center flex-wrap justify-center"
          >
            {/* Again Button */}
            <motion.button
              onClick={() => handleCardAction('again')}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 text-base font-medium shadow-lg min-w-[120px]"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">❌</span>
                <span>Again</span>
                <span className="text-xs opacity-80">1 day</span>
              </div>
            </motion.button>

            {/* Hard Button */}
            <motion.button
              onClick={() => handleCardAction('hard')}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 text-base font-medium shadow-lg min-w-[120px]"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">😓</span>
                <span>Hard</span>
                <span className="text-xs opacity-80">
                  {formatInterval(Math.max(Math.round(safeCard.interval * 0.8), 1))}
                </span>
              </div>
            </motion.button>

            {/* Good Button */}
            <motion.button
              onClick={() => handleCardAction('good')}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-base font-medium shadow-lg min-w-[120px]"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">👍</span>
                <span>Good</span>
                <span className="text-xs opacity-80">{formatInterval(safeCard.interval)}</span>
              </div>
            </motion.button>

            {/* Easy Button */}
            <motion.button
              onClick={() => handleCardAction('easy')}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 text-base font-medium shadow-lg min-w-[120px]"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">🚀</span>
                <span>Easy</span>
                <span className="text-xs opacity-80">
                  {formatInterval(Math.round(safeCard.interval * 1.3))}
                </span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard shortcuts hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 text-center text-gray-500 text-sm"
      >
        <p className="mb-2">
          💡 Tip: Use <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Space</kbd> or{' '}
          <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> to flip cards
        </p>
        {isFlipped && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs"
          >
            Keyboard shortcuts: <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">1</kbd>{' '}
            Again, <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">2</kbd> Hard,{' '}
            <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">3</kbd> Good,{' '}
            <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">4</kbd> Easy
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}

export default LearnMode
