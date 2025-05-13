import UserProfile from '@components/UserProfile/UserProfile.tsx'
import PlaylistsPage from '@components/PlaylistPage/PlaylistsPage.tsx'

export const routes = [
  { path: '/', element: <PlaylistsPage /> },
  { path: '/profile', element: <UserProfile /> },
]
