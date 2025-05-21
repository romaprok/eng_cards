import React from 'react'
import type { CardStatus } from '@/types/playlist'

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
  isAnimating: boolean
  prevCardIndex: number | null
  transitioningTo: number | null
  transitionStage: 'idle' | 'start' | 'animating'
  shuffledCards: Card[]
  currentCardIndex: number
  handleCardAction: (isKnown: boolean) => void
}

const LearnMode: React.FC<LearnModeProps> = ({
  currentCard,
  isFlipped,
  handleLearnCardFlip,
  handleLearnCardKeyDown,
  isAnimating,
  prevCardIndex,
  transitioningTo,
  transitionStage,
  shuffledCards,
  currentCardIndex,
  handleCardAction,
}) => {
  const showTransition = isAnimating && prevCardIndex !== null && transitioningTo !== null
  const incomingCard = showTransition ? shuffledCards[transitioningTo] : null

  return (
    <div className="relative flex flex-col items-center w-full">
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
                  <p className="text-base text-gray-500 mt-8">Click or press Enter/Space to flip</p>
                </div>
                <div
                  className="absolute w-full h-full flex flex-col items-center justify-center rounded-2xl bg-blue-50 shadow-2xl border border-blue-200 rotate-y-180 backface-hidden p-8"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <h3 className="text-3xl font-bold mb-6">Translation</h3>
                  <p className="text-5xl text-blue-700 font-semibold">{currentCard.translation}</p>
                  <p className="text-base text-gray-500 mt-8">Click or press Enter/Space to flip</p>
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
        <div className="flex gap-8 mt-8 px-8 items-center">
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

export default LearnMode
