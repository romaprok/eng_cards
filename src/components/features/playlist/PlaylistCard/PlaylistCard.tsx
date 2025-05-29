import { Link } from 'react-router-dom'
import { generatePlaylistRoute } from '@/config/routes'
import type { Playlist } from '@/types/playlist'

interface PlaylistCardProps {
  playlist: Playlist
  onDelete: (id: string) => void
}

const PlaylistCard = ({ playlist, onDelete }: PlaylistCardProps) => {
  const handleDeleteClick = () => {
    onDelete(playlist.id)
  }

  return (
    <li className="py-4 border-b border-gray-200 flex items-center justify-between last:border-b-0">
      <Link
        to={generatePlaylistRoute(playlist.id)}
        className="text-lg font-medium text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-1"
        aria-label={`View playlist ${playlist.name}`}
        tabIndex={0}
      >
        {playlist.name}
      </Link>
      <span className="text-gray-400 text-base">({playlist.cards.length} cards)</span>
      <button
        onClick={handleDeleteClick}
        aria-label={`Delete playlist ${playlist.name}`}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        Delete
      </button>
    </li>
  )
}

export default PlaylistCard
