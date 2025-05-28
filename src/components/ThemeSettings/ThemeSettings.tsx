import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import type { ThemeMode, ColorScheme, FontFamily, CardLayout, AnimationLevel } from '@/types/theme'

interface ThemeSettingsProps {
  isOpen: boolean
  onClose: () => void
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ isOpen, onClose }) => {
  const { settings, actions } = useTheme()
  const [activeTab, setActiveTab] = useState<'appearance' | 'accessibility' | 'layout'>(
    'appearance'
  )

  const colorSchemes: { value: ColorScheme; label: string; color: string }[] = [
    { value: 'blue', label: 'Blue', color: '#3b82f6' },
    { value: 'green', label: 'Green', color: '#22c55e' },
    { value: 'purple', label: 'Purple', color: '#a855f7' },
    { value: 'orange', label: 'Orange', color: '#f97316' },
    { value: 'red', label: 'Red', color: '#ef4444' },
    { value: 'teal', label: 'Teal', color: '#14b8a6' },
  ]

  const fontFamilies: { value: FontFamily; label: string; description: string }[] = [
    { value: 'inter', label: 'Inter', description: 'Modern and clean' },
    { value: 'roboto', label: 'Roboto', description: "Google's material design" },
    { value: 'open-dyslexic', label: 'OpenDyslexic', description: 'Dyslexia-friendly' },
    { value: 'comic-sans', label: 'Comic Sans', description: 'Playful and casual' },
    { value: 'system', label: 'System', description: 'Your device default' },
  ]

  const cardLayouts: { value: CardLayout; label: string; description: string }[] = [
    { value: 'default', label: 'Default', description: 'Balanced spacing' },
    { value: 'minimal', label: 'Minimal', description: 'Clean and simple' },
    { value: 'compact', label: 'Compact', description: 'Space efficient' },
    { value: 'spacious', label: 'Spacious', description: 'Extra breathing room' },
  ]

  const animationLevels: { value: AnimationLevel; label: string; description: string }[] = [
    { value: 'none', label: 'None', description: 'No animations' },
    { value: 'reduced', label: 'Reduced', description: 'Minimal animations' },
    { value: 'normal', label: 'Normal', description: 'Standard animations' },
    { value: 'enhanced', label: 'Enhanced', description: 'Rich animations' },
  ]

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'accessibility', label: 'Accessibility', icon: '♿' },
    { id: 'layout', label: 'Layout', icon: '📐' },
  ] as const

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Theme Settings</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4">
                <nav className="space-y-2">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-xl">{tab.icon}</span>
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Reset Button */}
                <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={actions.resetToDefaults}
                    className="w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Reset to Defaults
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeTab === 'appearance' && (
                    <motion.div
                      key="appearance"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      {/* Theme Mode */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Theme Mode
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                          {(['light', 'dark', 'auto'] as ThemeMode[]).map(mode => (
                            <button
                              key={mode}
                              onClick={() => actions.setThemeMode(mode)}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                settings.mode === mode
                                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                              }`}
                            >
                              <div className="text-center">
                                <div className="text-2xl mb-2">
                                  {mode === 'light' ? '☀️' : mode === 'dark' ? '🌙' : '🔄'}
                                </div>
                                <div className="font-medium capitalize text-gray-900 dark:text-white">
                                  {mode}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color Scheme */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Color Scheme
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                          {colorSchemes.map(scheme => (
                            <button
                              key={scheme.value}
                              onClick={() => actions.setColorScheme(scheme.value)}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                settings.colorScheme === scheme.value
                                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                              }`}
                            >
                              <div className="text-center">
                                <div
                                  className="w-8 h-8 rounded-full mx-auto mb-2"
                                  style={{ backgroundColor: scheme.color }}
                                />
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {scheme.label}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Font Family */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Font Family
                        </h3>
                        <div className="space-y-3">
                          {fontFamilies.map(font => (
                            <button
                              key={font.value}
                              onClick={() => actions.setFontFamily(font.value)}
                              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                                settings.fontFamily === font.value
                                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white">
                                    {font.label}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {font.description}
                                  </div>
                                </div>
                                <div className="text-lg">Aa</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Font Size */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Font Size
                        </h3>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">14px</span>
                          <input
                            type="range"
                            min="14"
                            max="24"
                            value={settings.fontSize}
                            onChange={e => actions.setFontSize(Number(e.target.value))}
                            className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-sm text-gray-500 dark:text-gray-400">24px</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                            {settings.fontSize}px
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'accessibility' && (
                    <motion.div
                      key="accessibility"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      {/* High Contrast */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            High Contrast
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Increase contrast for better visibility
                          </p>
                        </div>
                        <button
                          onClick={() => actions.setHighContrast(!settings.highContrast)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.highContrast
                              ? 'bg-primary-600'
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Reduced Motion */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            Reduced Motion
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Minimize animations and transitions
                          </p>
                        </div>
                        <button
                          onClick={() => actions.setReducedMotion(!settings.reducedMotion)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.reducedMotion
                              ? 'bg-primary-600'
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Animation Level */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Animation Level
                        </h3>
                        <div className="space-y-3">
                          {animationLevels.map(level => (
                            <button
                              key={level.value}
                              onClick={() => actions.setAnimationLevel(level.value)}
                              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                                settings.animationLevel === level.value
                                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                              }`}
                            >
                              <div className="font-medium text-gray-900 dark:text-white">
                                {level.label}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {level.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'layout' && (
                    <motion.div
                      key="layout"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      {/* Card Layout */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Card Layout
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {cardLayouts.map(layout => (
                            <button
                              key={layout.value}
                              onClick={() => actions.setCardLayout(layout.value)}
                              className={`p-4 rounded-lg border-2 text-left transition-all ${
                                settings.cardLayout === layout.value
                                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                              }`}
                            >
                              <div className="font-medium text-gray-900 dark:text-white mb-1">
                                {layout.label}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {layout.description}
                              </div>

                              {/* Visual preview */}
                              <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-800 rounded">
                                <div
                                  className={`bg-white dark:bg-gray-700 rounded border ${
                                    layout.value === 'minimal'
                                      ? 'p-1'
                                      : layout.value === 'compact'
                                        ? 'p-2'
                                        : layout.value === 'spacious'
                                          ? 'p-4'
                                          : 'p-3'
                                  }`}
                                >
                                  <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                                  <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ThemeSettings
