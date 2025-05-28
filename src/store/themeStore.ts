import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  type ThemeSettings,
  type ThemeColors,
  type ThemeMode,
  type ColorScheme,
  type FontFamily,
  type CardLayout,
  type AnimationLevel,
  DEFAULT_THEME_SETTINGS,
  COLOR_SCHEMES,
  DARK_MODE_OVERRIDES,
} from '@/types/theme'

interface ThemeState {
  settings: ThemeSettings
  currentColors: ThemeColors
  isDarkMode: boolean

  // Actions
  setThemeMode: (mode: ThemeMode) => void
  setColorScheme: (scheme: ColorScheme) => void
  setFontFamily: (font: FontFamily) => void
  setFontSize: (size: number) => void
  setCardLayout: (layout: CardLayout) => void
  setAnimationLevel: (level: AnimationLevel) => void
  setHighContrast: (enabled: boolean) => void
  setReducedMotion: (enabled: boolean) => void
  resetToDefaults: () => void

  // Computed
  updateColors: () => void
  getSystemPrefersDark: () => boolean
}

const getSystemPrefersDark = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const computeCurrentColors = (settings: ThemeSettings): ThemeColors => {
  const baseColors = COLOR_SCHEMES[settings.colorScheme]
  const shouldUseDark =
    settings.mode === 'dark' || (settings.mode === 'auto' && getSystemPrefersDark())

  if (shouldUseDark) {
    return {
      ...baseColors,
      ...DARK_MODE_OVERRIDES,
      gray: {
        ...baseColors.gray,
        ...DARK_MODE_OVERRIDES.gray,
      },
      text: {
        ...baseColors.text,
        ...DARK_MODE_OVERRIDES.text,
      },
    }
  }

  return baseColors
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      settings: DEFAULT_THEME_SETTINGS,
      currentColors: computeCurrentColors(DEFAULT_THEME_SETTINGS),
      isDarkMode: false,

      setThemeMode: mode => {
        set(state => {
          const newSettings = { ...state.settings, mode }
          const newColors = computeCurrentColors(newSettings)
          const isDarkMode = mode === 'dark' || (mode === 'auto' && getSystemPrefersDark())

          return {
            settings: newSettings,
            currentColors: newColors,
            isDarkMode,
          }
        })
      },

      setColorScheme: colorScheme => {
        set(state => {
          const newSettings = { ...state.settings, colorScheme }
          const newColors = computeCurrentColors(newSettings)

          return {
            settings: newSettings,
            currentColors: newColors,
          }
        })
      },

      setFontFamily: fontFamily => {
        set(state => ({
          settings: { ...state.settings, fontFamily },
        }))
      },

      setFontSize: fontSize => {
        set(state => ({
          settings: { ...state.settings, fontSize: Math.max(14, Math.min(24, fontSize)) },
        }))
      },

      setCardLayout: cardLayout => {
        set(state => ({
          settings: { ...state.settings, cardLayout },
        }))
      },

      setAnimationLevel: animationLevel => {
        set(state => ({
          settings: { ...state.settings, animationLevel },
        }))
      },

      setHighContrast: highContrast => {
        set(state => ({
          settings: { ...state.settings, highContrast },
        }))
      },

      setReducedMotion: reducedMotion => {
        set(state => ({
          settings: { ...state.settings, reducedMotion },
        }))
      },

      resetToDefaults: () => {
        const newColors = computeCurrentColors(DEFAULT_THEME_SETTINGS)
        const isDarkMode =
          DEFAULT_THEME_SETTINGS.mode === 'dark' ||
          (DEFAULT_THEME_SETTINGS.mode === 'auto' && getSystemPrefersDark())

        set({
          settings: DEFAULT_THEME_SETTINGS,
          currentColors: newColors,
          isDarkMode,
        })
      },

      updateColors: () => {
        const state = get()
        const newColors = computeCurrentColors(state.settings)
        const isDarkMode =
          state.settings.mode === 'dark' ||
          (state.settings.mode === 'auto' && getSystemPrefersDark())

        set({
          currentColors: newColors,
          isDarkMode,
        })
      },

      getSystemPrefersDark,
    }),
    {
      name: 'theme-settings',
      partialize: state => ({ settings: state.settings }),
    }
  )
)
