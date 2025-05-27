import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePlaylistStore } from '@store/playlistStore.ts'
import PlaylistEmptyPage from '@components/PlaylistsPage/PlaylistEmptyPage/PlaylistEmptyPage.tsx'
import BackArrowButton from '@components/BackArrowButton/BackArrowButton.tsx'
import PerformanceStats from './PerformanceStats'
import type { CardStatus } from '@/types/playlist'

const getStatusColor = (status: CardStatus) => {
  switch (status) {
    case 'new':
      return 'bg-gray-100 text-gray-600'
    case 'learning':
      return 'bg-blue-100 text-blue-600'
    case 'mastered':
      return 'bg-green-100 text-green-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const PlaylistPage = () => {
  const { id } = useParams<{ id: string }>()
  const playlist = usePlaylistStore(state => state.playlists.find(p => p.id === id))
  const getAvailableCards = usePlaylistStore(state => state.getAvailableCards)
  const navigate = useNavigate()

  const handleStartTrainingClick = () => {
    if (playlist) navigate(`/playlist/${playlist.id}/training`)
  }

  const handleAddWordClick = () => {
    if (playlist) navigate(`/playlist/${playlist.id}/add-word`)
  }

  const availableCards = playlist ? getAvailableCards(playlist.id) : []
  const hasAvailableCards = availableCards.length > 0

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto min-h-auto">
        <div className="flex justify-between items-center mb-6">
          <BackArrowButton pathTo="/" buttonText="Back to playlists" />
          {playlist && (
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-4">
                <button
                  onClick={handleStartTrainingClick}
                  disabled={!hasAvailableCards}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    !hasAvailableCards
                      ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  title={
                    !hasAvailableCards
                      ? 'No cards available for training. Add new cards or wait for review time to pass.'
                      : ''
                  }
                >
                  Start Training
                </button>
                <button
                  onClick={handleAddWordClick}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Add Word
                </button>
              </div>
              {playlist.cards.length > 0 && (
                <span className="text-sm text-gray-500">
                  {hasAvailableCards
                    ? `${availableCards.length} card${availableCards.length !== 1 ? 's' : ''} ready for review`
                    : 'No cards ready for review'}
                </span>
              )}
            </div>
          )}
        </div>

        {!playlist ? (
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Playlist not found</h2>
            <p className="text-gray-500">The playlist you are looking for does not exist.</p>
          </div>
        ) : (
          <>
            {/* Performance Statistics */}
            <PerformanceStats cards={playlist.cards} />

            <section className="w-full rounded-xl shadow-lg p-8 bg-white">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">{playlist.name}</h2>
                <div className="text-gray-600 mb-6">
                  {playlist.cards.length} word{playlist.cards.length !== 1 ? 's' : ''}
                </div>
              </div>
              {playlist.cards.length === 0 ? (
                <PlaylistEmptyPage />
              ) : (
                <ul className="divide-y divide-gray-200">
                  {playlist.cards.map(card => {
                    // Ensure card has SM-2 fields for display
                    const displayCard = {
                      ...card,
                      successRate: card.successRate || 0,
                      totalReviews: card.totalReviews || 0,
                    }

                    return (
                      <li key={card.id} className="py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <span className="text-lg text-gray-900">{card.word}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(card.status)}`}
                          >
                            {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                          </span>
                          {displayCard.totalReviews > 0 && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {displayCard.successRate.toFixed(0)}% ({displayCard.totalReviews}{' '}
                              reviews)
                            </span>
                          )}
                        </div>
                        <span className="text-gray-500">{card.translation}</span>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )
}

export default PlaylistPage
