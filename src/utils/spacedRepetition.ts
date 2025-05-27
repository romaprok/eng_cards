import type { Card, DifficultyRating, CardStatus } from '@/types/playlist'

// SM-2 Algorithm constants
const INITIAL_EASE_FACTOR = 2.5
const MINIMUM_EASE_FACTOR = 1.3
const EASE_FACTOR_BONUS = 0.15
const EASE_FACTOR_PENALTY = 0.2

// Convert days to milliseconds
const DAYS_TO_MS = 24 * 60 * 60 * 1000

/**
 * Calculate the next review interval using SM-2 algorithm
 * @param card Current card data
 * @param rating User's difficulty rating (again, hard, good, easy)
 * @returns Updated card with new interval, ease factor, and review date
 */
export const calculateNextReview = (card: Card, rating: DifficultyRating): Partial<Card> => {
  const now = Date.now()

  // Safely access card properties with defaults
  let easeFactor = card.easeFactor ?? INITIAL_EASE_FACTOR
  let interval = card.interval ?? 0
  let repetitions = card.repetitions ?? 0
  let totalReviews = card.totalReviews ?? 0
  let correctReviews = card.correctReviews ?? 0

  // Update review statistics
  totalReviews += 1
  const isCorrect = rating !== 'again'
  if (isCorrect) {
    correctReviews += 1
  }
  const successRate = totalReviews > 0 ? (correctReviews / totalReviews) * 100 : 0

  // Handle "again" rating (incorrect answer)
  if (rating === 'again') {
    repetitions = 0
    interval = 1 // Reset to 1 day
    easeFactor = Math.max(easeFactor - EASE_FACTOR_PENALTY, MINIMUM_EASE_FACTOR)

    return {
      easeFactor,
      interval,
      repetitions,
      totalReviews,
      correctReviews,
      successRate,
      status: 'learning' as CardStatus,
      lastSeen: now,
      nextReview: now + interval * DAYS_TO_MS,
    }
  }

  // Handle correct answers (hard, good, easy)
  repetitions += 1

  // Calculate new interval based on SM-2 algorithm
  if (repetitions === 1) {
    interval = 1
  } else if (repetitions === 2) {
    interval = 6
  } else {
    interval = Math.round(interval * easeFactor)
  }

  // Adjust ease factor based on difficulty rating
  switch (rating) {
    case 'hard':
      easeFactor = Math.max(easeFactor - EASE_FACTOR_PENALTY, MINIMUM_EASE_FACTOR)
      interval = Math.max(Math.round(interval * 0.8), 1) // Reduce interval by 20%
      break
    case 'good':
      // No change to ease factor for "good" rating
      break
    case 'easy':
      easeFactor += EASE_FACTOR_BONUS
      interval = Math.round(interval * 1.3) // Increase interval by 30%
      break
  }

  // Determine card status based on repetitions and performance
  let status: CardStatus = 'learning'
  if (repetitions >= 3 && successRate >= 80) {
    status = 'mastered'
  } else if (repetitions >= 1) {
    status = 'learning'
  }

  return {
    easeFactor,
    interval,
    repetitions,
    totalReviews,
    correctReviews,
    successRate,
    status,
    lastSeen: now,
    nextReview: now + interval * DAYS_TO_MS,
  }
}

/**
 * Initialize a new card with default SM-2 values
 */
export const initializeCard = (
  cardData: Omit<
    Card,
    | 'id'
    | 'status'
    | 'lastSeen'
    | 'nextReview'
    | 'easeFactor'
    | 'interval'
    | 'repetitions'
    | 'totalReviews'
    | 'correctReviews'
    | 'successRate'
  >
): Omit<Card, 'id'> => {
  return {
    ...cardData,
    status: 'new',
    lastSeen: null,
    nextReview: null,
    easeFactor: INITIAL_EASE_FACTOR,
    interval: 0,
    repetitions: 0,
    totalReviews: 0,
    correctReviews: 0,
    successRate: 0,
  }
}

/**
 * Check if a card is due for review
 */
export const isCardDue = (card: Card): boolean => {
  if (card.status === 'new') return true
  if (!card.nextReview) return true
  return Date.now() >= card.nextReview
}

/**
 * Get cards that are available for review (due or new)
 */
export const getAvailableCards = (cards: Card[]): Card[] => {
  return cards.filter(isCardDue)
}

/**
 * Get performance statistics for a set of cards
 */
export const getPerformanceStats = (cards: Card[]) => {
  const totalCards = cards.length
  const newCards = cards.filter(c => c.status === 'new').length
  const learningCards = cards.filter(c => c.status === 'learning').length
  const masteredCards = cards.filter(c => c.status === 'mastered').length

  const totalReviews = cards.reduce((sum, card) => sum + (card.totalReviews ?? 0), 0)
  const totalCorrect = cards.reduce((sum, card) => sum + (card.correctReviews ?? 0), 0)
  const overallSuccessRate = totalReviews > 0 ? (totalCorrect / totalReviews) * 100 : 0

  const dueCards = getAvailableCards(cards).length

  return {
    totalCards,
    newCards,
    learningCards,
    masteredCards,
    dueCards,
    totalReviews,
    overallSuccessRate: Math.round(overallSuccessRate * 10) / 10, // Round to 1 decimal
  }
}
