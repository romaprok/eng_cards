import { Link, Outlet } from 'react-router-dom'

const Layout = (): JSX.Element => (
  <div>
    <nav className="flex items-center justify-end p-4 bg-white shadow-md gap-4">
      <Link
        to="/"
        className="text-lg font-semibold text-blue-700 hover:text-blue-900 transition-colors px-3 py-1 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Home
      </Link>
      <Link
        to="/profile"
        className="text-lg font-semibold text-blue-700 hover:text-blue-900 transition-colors px-3 py-1 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Profile
      </Link>
    </nav>
    <main>
      <Outlet />
    </main>
  </div>
)

export default Layout
