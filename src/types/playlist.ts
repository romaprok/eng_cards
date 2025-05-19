export type CardStatus = 'new' | 'learning' | 'mastered'

export type Card = {
  id: string
  word: string
  translation: string
  status: CardStatus
  lastSeen: number | null
  nextReview: number | null
}

export type Playlist = {
  id: string
  name: string
  cards: Card[]
}
