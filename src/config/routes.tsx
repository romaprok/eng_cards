import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

// Lazy load pages for better performance
const PlaylistsPage = lazy(() => import('@pages/PlaylistsPage'))
const PlaylistPage = lazy(() => import('@pages/PlaylistPage'))
const AddWordPage = lazy(() => import('@pages/AddWordPage'))
const PlaylistTrainingPage = lazy(() => import('@pages/PlaylistTrainingPage'))
const UserProfilePage = lazy(() => import('@pages/UserProfilePage'))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PlaylistsPage />,
    index: true,
  },
  {
    path: '/profile',
    element: <UserProfilePage />,
  },
  {
    path: '/playlist/:id',
    element: <PlaylistPage />,
  },
  {
    path: '/playlist/:id/add-word',
    element: <AddWordPage />,
  },
  {
    path: '/playlist/:id/training',
    element: <PlaylistTrainingPage />,
  },
]

// Route paths as constants for type safety
export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  PLAYLIST: '/playlist/:id',
  ADD_WORD: '/playlist/:id/add-word',
  TRAINING: '/playlist/:id/training',
} as const

// Helper functions for generating routes with parameters
export const generatePlaylistRoute = (id: string) => `/playlist/${id}`
export const generateAddWordRoute = (id: string) => `/playlist/${id}/add-word`
export const generateTrainingRoute = (id: string) => `/playlist/${id}/training`
