import { useState } from 'react'
import { usePlaylistStore } from './store/playlistStore'
import styles from './app.module.scss'
import type { Playlist } from './types/playlist'

const App = (): JSX.Element => {
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
    <div className={styles.appContainer}>
      <section>
        <h2>Your Playlists</h2>
        <form
          onSubmit={handleAddPlaylist}
          style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}
        >
          <input
            type="text"
            value={playlistName}
            onChange={e => setPlaylistName(e.target.value)}
            placeholder="Playlist name"
            aria-label="Playlist name"
            required
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {playlists.length === 0 && <li>No playlists yet. Add your first!</li>}
          {playlists.map((playlist: Playlist) => (
            <li
              key={playlist.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <span>
                {playlist.name}{' '}
                <span style={{ color: '#888', fontSize: '0.9em' }}>
                  ({playlist.cards.length} cards)
                </span>
              </span>
              <button
                onClick={() => removePlaylist(playlist.id)}
                aria-label={`Delete playlist ${playlist.name}`}
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

export default App
