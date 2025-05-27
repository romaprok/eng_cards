export type CardStatus = 'new' | 'learning' | 'mastered'

export type DifficultyRating = 'again' | 'hard' | 'good' | 'easy'

export type Card = {
  id: string
  word: string
  translation: string
  status: CardStatus
  lastSeen: number | null
  nextReview: number | null
  // SM-2 Algorithm fields
  easeFactor: number // Starting at 2.5, affects how quickly intervals grow
  interval: number // Current interval in days
  repetitions: number // Number of successful repetitions
  // Performance tracking
  totalReviews: number // Total number of times reviewed
  correctReviews: number // Number of correct reviews
  successRate: number // Percentage of correct reviews
}

export type Playlist = {
  id: string
  name: string
  cards: Card[]
}
