import { create } from 'zustand'
import type { Playlist, Card, CardStatus, DifficultyRating } from '../types/playlist'
import { v4 as uuidv4 } from 'uuid'
import {
  calculateNextReview,
  initializeCard,
  getAvailableCards as getAvailableCardsUtil,
} from '../utils/spacedRepetition'

const SIX_HOURS_MS = 6 * 60 * 60 * 1000
const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000

// Migration function to add SM-2 fields to existing cards
const migrateCard = (
  card: Partial<Card> & Pick<Card, 'id' | 'word' | 'translation' | 'status'>
): Card => {
  // If card already has SM-2 fields, return as is
  if (typeof card.easeFactor === 'number') {
    return card as Card
  }

  // Migrate old card to new format
  return {
    ...card,
    easeFactor: 2.5,
    interval: card.status === 'new' ? 0 : card.status === 'learning' ? 1 : 6,
    repetitions: card.status === 'new' ? 0 : card.status === 'learning' ? 1 : 3,
    totalReviews: 0,
    correctReviews: 0,
    successRate: 0,
    lastSeen: card.lastSeen ?? null,
    nextReview: card.nextReview ?? null,
  }
}

interface PlaylistState {
  playlists: Playlist[]
  addPlaylist: (name: string) => void
  removePlaylist: (id: string) => void
  addCardToPlaylist: (
    playlistId: string,
    card: Omit<
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
  ) => void
  updateCardWithRating: (playlistId: string, cardId: string, rating: DifficultyRating) => void
  updateCardStatus: (playlistId: string, cardId: string, status: CardStatus) => void
  getAvailableCards: (playlistId: string) => Card[]
  migrateCards: () => void
}

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  playlists: [],
  addPlaylist: (name: string) =>
    set(state => ({
      playlists: [...state.playlists, { id: uuidv4(), name, cards: [] }],
    })),
  removePlaylist: (id: string) =>
    set(state => ({
      playlists: state.playlists.filter(p => p.id !== id),
    })),
  addCardToPlaylist: (
    playlistId: string,
    card: Omit<
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
  ) =>
    set(state => ({
      playlists: state.playlists.map(p =>
        p.id === playlistId
          ? {
              ...p,
              cards: [
                ...p.cards,
                {
                  ...initializeCard(card),
                  id: uuidv4(),
                },
              ],
            }
          : p
      ),
    })),
  updateCardWithRating: (playlistId: string, cardId: string, rating: DifficultyRating) =>
    set(state => ({
      playlists: state.playlists.map(p =>
        p.id === playlistId
          ? {
              ...p,
              cards: p.cards.map(c => {
                if (c.id !== cardId) return c
                const migratedCard = migrateCard(c)
                const updates = calculateNextReview(migratedCard, rating)
                return { ...migratedCard, ...updates }
              }),
            }
          : p
      ),
    })),
  updateCardStatus: (playlistId: string, cardId: string, status: CardStatus) =>
    set(state => ({
      playlists: state.playlists.map(p =>
        p.id === playlistId
          ? {
              ...p,
              cards: p.cards.map(c => {
                if (c.id !== cardId) return c

                const now = Date.now()
                const nextReview =
                  status === 'learning'
                    ? now + SIX_HOURS_MS
                    : status === 'mastered'
                      ? now + FORTY_EIGHT_HOURS_MS
                      : null

                return {
                  ...migrateCard(c),
                  status,
                  lastSeen: now,
                  nextReview,
                }
              }),
            }
          : p
      ),
    })),
  getAvailableCards: (playlistId: string) => {
    const playlist = get().playlists.find(p => p.id === playlistId)
    if (!playlist) return []
    // Migrate cards on the fly when getting available cards
    const migratedCards = playlist.cards.map(migrateCard)
    return getAvailableCardsUtil(migratedCards)
  },
  migrateCards: () =>
    set(state => ({
      playlists: state.playlists.map(p => ({
        ...p,
        cards: p.cards.map(migrateCard),
      })),
    })),
}))
