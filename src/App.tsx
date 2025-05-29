import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import { routes } from '@/config/routes'
import Layout from '@components/Layout/Layout'

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
                index={route.index}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
