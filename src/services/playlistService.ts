import { v4 as uuidv4 } from 'uuid'
import type { Playlist, Card, DifficultyRating, CardStatus } from '@/types'
import { SM2_CONSTANTS, CARD_STATUS } from '@/constants'

export class PlaylistService {
  static createPlaylist(name: string): Playlist {
    return {
      id: uuidv4(),
      name,
      cards: [],
    }
  }

  static createCard(word: string, translation: string): Card {
    return {
      id: uuidv4(),
      word,
      translation,
      status: CARD_STATUS.NEW as CardStatus,
      lastSeen: null,
      nextReview: null,
      easeFactor: SM2_CONSTANTS.INITIAL_EASE_FACTOR,
      interval: SM2_CONSTANTS.INITIAL_INTERVAL,
      repetitions: 0,
      totalReviews: 0,
      correctReviews: 0,
      successRate: 0,
    }
  }

  static getAvailableCards(playlist: Playlist): Card[] {
    const now = Date.now()
    return playlist.cards.filter(card => {
      if (card.status === CARD_STATUS.NEW) return true
      if (!card.nextReview) return true
      return card.nextReview <= now
    })
  }

  static updateCardWithSM2(card: Card, rating: DifficultyRating): Card {
    const now = Date.now()
    let { easeFactor, interval, repetitions } = card

    // Update performance tracking
    const totalReviews = card.totalReviews + 1
    const correctReviews = card.correctReviews + (rating === 'good' || rating === 'easy' ? 1 : 0)
    const successRate = (correctReviews / totalReviews) * 100

    // SM-2 Algorithm implementation
    if (rating === 'again') {
      repetitions = 0
      interval = SM2_CONSTANTS.INTERVAL_MULTIPLIERS.AGAIN
    } else {
      if (repetitions === 0) {
        interval = 1
      } else if (repetitions === 1) {
        interval = 6
      } else {
        interval = Math.round(interval * easeFactor)
      }
      repetitions += 1
    }

    // Update ease factor
    const adjustment =
      SM2_CONSTANTS.EASE_FACTOR_ADJUSTMENT[
        rating.toUpperCase() as keyof typeof SM2_CONSTANTS.EASE_FACTOR_ADJUSTMENT
      ]
    easeFactor = Math.max(SM2_CONSTANTS.MINIMUM_EASE_FACTOR, easeFactor + adjustment)

    // Determine new status
    let status: CardStatus = card.status
    if (rating === 'again') {
      status = CARD_STATUS.LEARNING as CardStatus
    } else if (repetitions >= 2 && rating === 'easy') {
      status = CARD_STATUS.MASTERED as CardStatus
    } else if (repetitions >= 1) {
      status = CARD_STATUS.LEARNING as CardStatus
    }

    return {
      ...card,
      status,
      lastSeen: now,
      nextReview: now + interval * 24 * 60 * 60 * 1000, // Convert days to milliseconds
      easeFactor,
      interval,
      repetitions,
      totalReviews,
      correctReviews,
      successRate,
    }
  }

  static getPlaylistStats(playlist: Playlist) {
    const totalCards = playlist.cards.length
    const newCards = playlist.cards.filter(c => c.status === CARD_STATUS.NEW).length
    const learningCards = playlist.cards.filter(c => c.status === CARD_STATUS.LEARNING).length
    const masteredCards = playlist.cards.filter(c => c.status === CARD_STATUS.MASTERED).length
    const availableCards = this.getAvailableCards(playlist).length

    return {
      totalCards,
      newCards,
      learningCards,
      masteredCards,
      availableCards,
      completionRate: totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0,
    }
  }
}
