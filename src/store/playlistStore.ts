import { create } from 'zustand'
import type { Playlist, Card, CardStatus } from '../types/playlist'
import { v4 as uuidv4 } from 'uuid'

const SIX_HOURS_MS = 6 * 60 * 60 * 1000
const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000

interface PlaylistState {
  playlists: Playlist[]
  addPlaylist: (name: string) => void
  removePlaylist: (id: string) => void
  addCardToPlaylist: (
    playlistId: string,
    card: Omit<Card, 'id' | 'status' | 'lastSeen' | 'nextReview'>
  ) => void
  updateCardStatus: (playlistId: string, cardId: string, status: CardStatus) => void
  getAvailableCards: (playlistId: string) => Card[]
}

export const usePlaylistStore = create<PlaylistState>(
  (set: (fn: (state: PlaylistState) => Partial<PlaylistState>) => void, get) => ({
    playlists: [],
    addPlaylist: (name: string) =>
      set((state: PlaylistState) => ({
        playlists: [...state.playlists, { id: uuidv4(), name, cards: [] }],
      })),
    removePlaylist: (id: string) =>
      set((state: PlaylistState) => ({
        playlists: state.playlists.filter((p: Playlist) => p.id !== id),
      })),
    addCardToPlaylist: (
      playlistId: string,
      card: Omit<Card, 'id' | 'status' | 'lastSeen' | 'nextReview'>
    ) =>
      set((state: PlaylistState) => ({
        playlists: state.playlists.map((p: Playlist) =>
          p.id === playlistId
            ? {
                ...p,
                cards: [
                  ...p.cards,
                  {
                    ...card,
                    id: uuidv4(),
                    status: 'new',
                    lastSeen: null,
                    nextReview: null,
                  },
                ],
              }
            : p
        ),
      })),
    updateCardStatus: (playlistId: string, cardId: string, status: CardStatus) =>
      set((state: PlaylistState) => ({
        playlists: state.playlists.map((p: Playlist) =>
          p.id === playlistId
            ? {
                ...p,
                cards: p.cards.map((c: Card) => {
                  if (c.id !== cardId) return c

                  const now = Date.now()
                  const nextReview =
                    status === 'learning'
                      ? now + SIX_HOURS_MS
                      : status === 'mastered'
                        ? now + FORTY_EIGHT_HOURS_MS
                        : null

                  return {
                    ...c,
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

      const now = Date.now()
      return playlist.cards.filter(card => {
        if (card.status === 'new') return true
        if (!card.nextReview) return true
        return now >= card.nextReview
      })
    },
  })
)
