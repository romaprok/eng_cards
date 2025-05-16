import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import Layout from '@components/Layout/Layout.tsx'
import PlaylistTrainingMode from '@components/PlaylistsPage/PlaylistTrainingMode/PlaylistTrainingMode'
import PlaylistPage from '@components/PlaylistsPage/PlaylistPage/PlaylistPage'
import AddWordPage from '@components/PlaylistsPage/AddWordPage/AddWordPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map(({ path, element }) => (
            <Route
              key={path}
              index={path === '/'}
              path={path === '/' ? undefined : path}
              element={element}
            />
          ))}
          <Route path="playlist/:id" element={<PlaylistPage />} />
          <Route path="playlist/:id/add-word" element={<AddWordPage />} />
          <Route path="playlist/:id/training" element={<PlaylistTrainingMode />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
