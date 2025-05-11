import { create } from 'zustand'
import type { Playlist, Card } from '../types/playlist'
import { v4 as uuidv4 } from 'uuid'

interface PlaylistState {
  playlists: Playlist[]
  addPlaylist: (name: string) => void
  removePlaylist: (id: string) => void
  addCardToPlaylist: (playlistId: string, card: Omit<Card, 'id'>) => void
}

export const usePlaylistStore = create<PlaylistState>(set => ({
  playlists: [],
  addPlaylist: name =>
    set(state => ({
      playlists: [...state.playlists, { id: uuidv4(), name, cards: [] }],
    })),
  removePlaylist: id =>
    set(state => ({
      playlists: state.playlists.filter(p => p.id !== id),
    })),
  addCardToPlaylist: (playlistId, card) =>
    set(state => ({
      playlists: state.playlists.map(p =>
        p.id === playlistId ? { ...p, cards: [...p.cards, { ...card, id: uuidv4() }] } : p
      ),
    })),
}))
