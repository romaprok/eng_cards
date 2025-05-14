import UserProfile from '@components/UserProfile/UserProfile.tsx'
import PlaylistsPage from '@components/PlaylistPage/PlaylistsPage.tsx'
import PlaylistDetailsPage from '@components/PlaylistPage/PlaylistDetailsPage.tsx'

export const routes = [
  { path: '/', element: <PlaylistsPage /> },
  { path: '/profile', element: <UserProfile /> },
  { path: '/playlist/:id', element: <PlaylistDetailsPage /> },
]
