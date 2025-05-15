import { useParams, useNavigate } from 'react-router-dom'
import { usePlaylistStore } from '@store/playlistStore.ts'
import BackArrowButton from '@components/BackArrowButton/BackArrowButton.tsx'
import { useState } from 'react'

const AddWordPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addCardToPlaylist = usePlaylistStore(state => state.addCardToPlaylist)
  const playlist = usePlaylistStore(state => state.playlists.find(p => p.id === id))

  const [word, setWord] = useState('')
  const [translation, setTranslation] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!word.trim() || !translation.trim()) {
      setError('Please fill in both fields')
      return
    }

    if (!playlist) {
      setError('Playlist not found')
      return
    }

    addCardToPlaylist(playlist.id, {
      word: word.trim(),
      translation: translation.trim(),
    })

    navigate(`/playlist/${playlist.id}`)
  }

  if (!playlist) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto min-h-auto">
          <BackArrowButton pathTo="/" buttonText="Back to playlists" />
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Playlist not found</h2>
            <p className="text-gray-500">The playlist you are looking for does not exist.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto min-h-auto">
        <BackArrowButton pathTo={`/playlist/${playlist.id}`} buttonText="Back to playlist" />
        <section className="w-full max-w-xl mx-auto rounded-xl shadow-lg p-8 mt-8 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Add Word to {playlist.name}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="word" className="block text-sm font-medium text-gray-700 mb-1">
                Word
              </label>
              <input
                type="text"
                id="word"
                value={word}
                onChange={e => setWord(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter word"
              />
            </div>

            <div>
              <label htmlFor="translation" className="block text-sm font-medium text-gray-700 mb-1">
                Translation
              </label>
              <input
                type="text"
                id="translation"
                value={translation}
                onChange={e => setTranslation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter translation"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Add Word
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default AddWordPage
