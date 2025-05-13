import { useState } from 'react'
import { usePlaylistStore } from '@store/playlistStore.ts'
import type { Playlist } from '@types/playlist.ts'
import styles from './PlaylistPage.module.css'

const PlaylistsPage = (): JSX.Element => {
  const [playlistName, setPlaylistName] = useState('')
  const playlists = usePlaylistStore((state: { playlists: Playlist[] }) => state.playlists)
  const addPlaylist = usePlaylistStore(
    (state: { addPlaylist: (name: string) => void }) => state.addPlaylist
  )
  const removePlaylist = usePlaylistStore(
    (state: { removePlaylist: (id: string) => void }) => state.removePlaylist
  )

  const handleAddPlaylist = (e: React.FormEvent): void => {
    e.preventDefault()
    if (!playlistName.trim()) return
    addPlaylist(playlistName.trim())
    setPlaylistName('')
  }

  return (
    <div className={styles.appContainer + ' bg-gray-50 min-h-screen'}>
      <section className={styles.playlistSection + ' bg-white'}>
        <h2 className={styles.playlistTitle + ' text-3xl font-bold text-gray-900 mb-8'}>
          Your Playlists
        </h2>
        <form onSubmit={handleAddPlaylist} className="flex gap-4 mb-6">
          <input
            type="text"
            value={playlistName}
            onChange={e => setPlaylistName(e.target.value)}
            placeholder="Playlist name"
            aria-label="Playlist name"
            required
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </form>
        <ul className={styles.playlistList}>
          {playlists.length === 0 && (
            <li className="text-gray-400">No playlists yet. Add your first!</li>
          )}
          {playlists.map((playlist: Playlist) => (
            <li
              key={playlist.id}
              className="py-4 border-b border-gray-200 flex items-center justify-between last:border-b-0"
            >
              <span className="text-lg font-medium text-gray-900">
                {playlist.name}{' '}
                <span className="cardCount text-gray-400 text-base">
                  ({playlist.cards.length} cards)
                </span>
              </span>
              <button
                onClick={() => removePlaylist(playlist.id)}
                aria-label={`Delete playlist ${playlist.name}`}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default PlaylistsPage
