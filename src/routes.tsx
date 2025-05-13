import UserProfile from './components/UserProfile'
import PlaylistsPage from './components/PlaylistsPage'

export const routes = [
  { path: '/', element: <PlaylistsPage /> },
  { path: '/profile', element: <UserProfile /> },
]
