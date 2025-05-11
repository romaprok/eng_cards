export type Card = {
  id: string
  word: string
  translation: string
}

export type Playlist = {
  id: string
  name: string
  cards: Card[]
}
