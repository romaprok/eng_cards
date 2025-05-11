import { create } from 'zustand'
import type { Playlist, Card } from '../types/playlist'
import { v4 as uuidv4 } from 'uuid'

interface PlaylistState {
  playlists: Playlist[]
  addPlaylist: (name: string) => void
  removePlaylist: (id: string) => void
  addCardToPlaylist: (playlistId: string, card: Omit<Card, 'id'>) => void
}

export const usePlaylistStore = create<PlaylistState>(
  (set: (fn: (state: PlaylistState) => Partial<PlaylistState>) => void) => ({
    playlists: [],
    addPlaylist: (name: string) =>
      set((state: PlaylistState) => ({
        playlists: [...state.playlists, { id: uuidv4(), name, cards: [] }],
      })),
    removePlaylist: (id: string) =>
      set((state: PlaylistState) => ({
        playlists: state.playlists.filter((p: Playlist) => p.id !== id),
      })),
    addCardToPlaylist: (playlistId: string, card: Omit<Card, 'id'>) =>
      set((state: PlaylistState) => ({
        playlists: state.playlists.map((p: Playlist) =>
          p.id === playlistId ? { ...p, cards: [...p.cards, { ...card, id: uuidv4() }] } : p
        ),
      })),
  })
)
