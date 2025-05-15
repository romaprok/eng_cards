import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import Layout from '@components/Layout/Layout.tsx'

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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
