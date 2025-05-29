import { useState } from 'react'

interface AddPlaylistFormProps {
  onSubmit: (name: string) => void
}

const AddPlaylistForm = ({ onSubmit }: AddPlaylistFormProps) => {
  const [playlistName, setPlaylistName] = useState('')

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (!playlistName.trim()) return
    onSubmit(playlistName.trim())
    setPlaylistName('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
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
  )
}

export default AddPlaylistForm
