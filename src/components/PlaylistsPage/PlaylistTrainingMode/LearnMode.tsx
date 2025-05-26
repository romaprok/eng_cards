import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CardStatus } from '@/types/playlist'
import AnimatedFlipCard from './AnimatedFlipCard'

interface Card {
  id: string
  word: string
  translation: string
  status: CardStatus
}

interface LearnModeProps {
  currentCard: Card
  isFlipped: boolean
  handleLearnCardFlip: () => void
  handleLearnCardKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
  shuffledCards: Card[]
  currentCardIndex: number
  handleCardAction: (isKnown: boolean) => void
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
  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Card Container */}
      <div className="relative w-[35rem] h-[25rem] mb-8">
        <AnimatedFlipCard
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={handleLearnCardFlip}
          onKeyDown={handleLearnCardKeyDown}
        />
      </div>

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

      {/* Action buttons with enhanced animations */}
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
            className="flex gap-8 px-8 items-center"
          >
            <motion.button
              onClick={() => handleCardAction(false)}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 text-lg font-medium shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="flex items-center gap-2">
                <span>❌</span>
                Don't Know
              </span>
            </motion.button>

            <motion.button
              onClick={() => handleCardAction(true)}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 text-lg font-medium shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="flex items-center gap-2">
                <span>✅</span>
                Know It
              </span>
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
        <p>
          💡 Tip: Use <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Space</kbd> or{' '}
          <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> to flip cards
        </p>
      </motion.div>
    </div>
  )
}

export default LearnMode
