import { usePlaylistStore } from '@store/playlistStore'
import { PlaylistCard, AddPlaylistForm } from '@components/features/playlist'
import type { Playlist } from '@/types/playlist'

const PlaylistsPage = () => {
  const playlists = usePlaylistStore(state => state.playlists)
  const addPlaylist = usePlaylistStore(state => state.addPlaylist)
  const removePlaylist = usePlaylistStore(state => state.removePlaylist)

  const handleAddPlaylist = (name: string): void => {
    addPlaylist(name)
  }

  const handleDeletePlaylist = (id: string): void => {
    removePlaylist(id)
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-8">
      <section className="w-full max-w-xl rounded-xl shadow-lg p-8 mt-8 bg-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Playlists</h2>

        <AddPlaylistForm onSubmit={handleAddPlaylist} />

        <ul>
          {playlists.length === 0 && (
            <li className="text-gray-400">No playlists yet. Add your first!</li>
          )}
          {playlists.map((playlist: Playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} onDelete={handleDeletePlaylist} />
          ))}
        </ul>
      </section>
    </div>
  )
}

export default PlaylistsPage
