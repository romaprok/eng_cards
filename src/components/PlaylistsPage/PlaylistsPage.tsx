import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePlaylistStore } from '@store/playlistStore.ts'
import type { Playlist } from '@/types/playlist'

const PlaylistsPage = (): JSX.Element => {
  const [playlistName, setPlaylistName] = useState('')

  const playlists = usePlaylistStore(state => state.playlists)
  const addPlaylist = usePlaylistStore(state => state.addPlaylist)
  const removePlaylist = usePlaylistStore(state => state.removePlaylist)

  const handleAddPlaylist = (e: React.FormEvent): void => {
    e.preventDefault()
    if (!playlistName.trim()) return
    addPlaylist(playlistName.trim())
    setPlaylistName('')
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-8">
      <section className="w-full max-w-xl rounded-xl shadow-lg p-8 mt-8 bg-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Playlists</h2>
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
        <ul>
          {playlists.length === 0 && (
            <li className="text-gray-400">No playlists yet. Add your first!</li>
          )}
          {playlists.map((playlist: Playlist) => (
            <li
              key={playlist.id}
              className="py-4 border-b border-gray-200 flex items-center justify-between last:border-b-0"
            >
              <Link
                to={`/playlist/${playlist.id}`}
                className="text-lg font-medium text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-1"
                aria-label={`View playlist ${playlist.name}`}
                tabIndex={0}
              >
                {playlist.name}
              </Link>
              <span className="text-gray-400 text-base">({playlist.cards.length} cards)</span>
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
