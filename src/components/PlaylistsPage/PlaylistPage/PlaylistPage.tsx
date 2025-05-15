import { useParams } from 'react-router-dom'
import { usePlaylistStore } from '@store/playlistStore.ts'
import PlaylistEmptyPage from '@components/PlaylistsPage/PlaylistEmptyPage/PlaylistEmptyPage.tsx'
import BackArrowButton from '@components/BackArrowButton/BackArrowButton.tsx'

const PlaylistPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const playlist = usePlaylistStore(state => state.playlists.find(p => p.id === id))

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto min-h-auto">
        <BackArrowButton pathTo="/" buttonText="Back to playlists" />
        {!playlist ? (
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Playlist not found</h2>
            <p className="text-gray-500">The playlist you are looking for does not exist.</p>
          </div>
        ) : (
          <section className="w-full rounded-xl shadow-lg p-8 mt-8 bg-white">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{playlist.name}</h2>
            <div className="text-gray-600 mb-6">
              {playlist.cards.length} word{playlist.cards.length !== 1 ? 's' : ''}
            </div>
            {playlist.cards.length === 0 ? (
              <PlaylistEmptyPage />
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
        )}
      </div>
    </div>
  )
}

export default PlaylistPage
