import UserProfile from '@components/UserProfile/UserProfile.tsx'
import PlaylistsPage from '@components/PlaylistsPage/PlaylistsPage.tsx'
import PlaylistPage from '@components/PlaylistsPage/PlaylistPage/PlaylistPage.tsx'

export const routes = [
  { path: '/', element: <PlaylistsPage /> },
  { path: '/profile', element: <UserProfile /> },
  { path: '/playlist/:id', element: <PlaylistPage /> },
]
