import { motion } from 'framer-motion'
import type { CardStatus } from '@/types/playlist'

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

interface AnimatedFlipCardProps {
  card: Card
  isFlipped: boolean
  onFlip: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

const AnimatedFlipCard: React.FC<AnimatedFlipCardProps> = ({
  card,
  isFlipped,
  onFlip,
  onKeyDown,
}) => {
  return (
    <motion.div
      className="relative w-[35rem] h-[25rem] cursor-pointer"
      style={{ perspective: '1000px' }}
      tabIndex={0}
      aria-label={
        isFlipped ? `Show word for ${card.translation}` : `Show translation for ${card.word}`
      }
      onClick={onFlip}
      onKeyDown={onKeyDown}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1],
          type: 'tween',
        }}
      >
        {/* Front side - Word */}
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
          <div className="w-full h-full flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 shadow-2xl border border-blue-200 p-8 relative overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 w-8 h-8 bg-blue-400 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-indigo-400 rounded-full"></div>
              <div className="absolute top-1/2 right-8 w-4 h-4 bg-blue-300 rounded-full"></div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">English Word</h3>
              <p className="text-5xl text-gray-800 font-bold mb-4">{card.word}</p>
              <motion.p
                className="text-base text-gray-600 mt-8 flex items-center justify-center gap-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span>💡</span>
                Click or press Enter/Space to flip
              </motion.p>
            </div>
          </div>
        </div>

        {/* Back side - Translation */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 shadow-2xl border border-green-200 p-8 relative overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 right-4 w-8 h-8 bg-green-400 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-emerald-400 rounded-full"></div>
              <div className="absolute top-1/2 left-8 w-4 h-4 bg-green-300 rounded-full"></div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-green-800">Translation</h3>
              <p className="text-5xl text-green-700 font-bold mb-4">{card.translation}</p>
              <motion.p
                className="text-base text-gray-600 mt-8 flex items-center justify-center gap-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span>🔄</span>
                Click or press Enter/Space to flip back
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AnimatedFlipCard
