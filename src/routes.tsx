import UserProfile from '@components/UserProfile/UserProfile.tsx'
import PlaylistsPage from '@components/PlaylistsPage/PlaylistsPage.tsx'
import PlaylistPage from '@components/PlaylistsPage/PlaylistPage/PlaylistPage.tsx'
import AddWordPage from '@components/PlaylistsPage/AddWordPage/AddWordPage.tsx'

export const routes = [
  { path: '/', element: <PlaylistsPage /> },
  { path: '/profile', element: <UserProfile /> },
  { path: '/playlist/:id', element: <PlaylistPage /> },
  { path: '/playlist/:id/add-word', element: <AddWordPage /> },
]
