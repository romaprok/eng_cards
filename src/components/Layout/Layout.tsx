import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import ThemeSettings from '@/components/ThemeSettings/ThemeSettings'

interface NavLinkProps {
  to: string
  children: React.ReactNode
}

const NavLink = ({ to, children }: NavLinkProps) => (
  <Link
    to={to}
    className="text-lg font-semibold text-primary-700 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-100 transition-colors px-3 py-1 rounded hover:bg-primary-50 dark:hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
  >
    {children}
  </Link>
)

const Layout = () => {
  const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false)

  // Initialize theme
  useTheme()

  return (
    <div className="min-h-screen bg-background text-primary">
      <nav className="flex items-center justify-between p-4 bg-surface shadow-md">
        <div className="flex items-center gap-4">
          <NavLink to="/">🎓 Eng Cards</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>

          {/* Theme Settings Button */}
          <button
            onClick={() => setIsThemeSettingsOpen(true)}
            className="p-2 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Open theme settings"
            title="Theme Settings"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </nav>

      <main className="custom-scrollbar">
        <Outlet />
      </main>

      {/* Theme Settings Modal */}
      <ThemeSettings isOpen={isThemeSettingsOpen} onClose={() => setIsThemeSettingsOpen(false)} />
    </div>
  )
}

export default Layout
