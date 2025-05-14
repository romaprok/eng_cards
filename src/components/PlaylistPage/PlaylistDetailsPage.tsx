import { useParams, Link } from 'react-router-dom'
import { usePlaylistStore } from '@store/playlistStore.ts'

const PlaylistDetailsPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const playlist = usePlaylistStore(state => state.playlists.find(p => p.id === id))

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Playlist not found</h2>
          <p className="text-gray-500">The playlist you are looking for does not exist.</p>
          <Link
            to="/"
            className="inline-block mt-6 text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 py-1"
            aria-label="Back to playlists"
            tabIndex={0}
          >
            ← Back to Playlists
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
      <section className="w-full max-w-xl rounded-xl shadow-lg p-8 mt-8 bg-white">
        <Link
          to="/"
          className="inline-block mb-6 text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 py-1"
          aria-label="Back to playlists"
          tabIndex={0}
        >
          ← Back to Playlists
        </Link>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{playlist.name}</h2>
        <div className="text-gray-600 mb-6">
          {playlist.cards.length} word{playlist.cards.length !== 1 ? 's' : ''}
        </div>
        {playlist.cards.length === 0 ? (
          <div className="text-gray-400 text-center">No words in this playlist yet.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {playlist.cards.map(card => (
              <li key={card.id} className="py-4 flex justify-between items-center">
                <span className="text-lg text-gray-900">{card.word}</span>
                <span className="text-gray-500">{card.translation}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default PlaylistDetailsPage
