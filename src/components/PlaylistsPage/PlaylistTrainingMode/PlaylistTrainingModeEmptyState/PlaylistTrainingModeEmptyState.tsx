import BackArrowButton from '@components/BackArrowButton/BackArrowButton.tsx'

const PlaylistTrainingModeEmptyState = ({ playlistId }: { playlistId: string }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto min-h-auto">
        <BackArrowButton pathTo={`/playlist/${playlistId}`} buttonText="Back to playlist" />
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No cards in this playlist</h2>
          <p className="text-gray-500">Please add some words to start training.</p>
        </div>
      </div>
    </div>
  )
}
export default PlaylistTrainingModeEmptyState
