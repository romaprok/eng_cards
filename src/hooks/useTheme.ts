import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import { FONT_FAMILIES } from '@/types/theme'

export const useTheme = () => {
  const {
    settings,
    currentColors,
    isDarkMode,
    setThemeMode,
    setColorScheme,
    setFontFamily,
    setFontSize,
    setCardLayout,
    setAnimationLevel,
    setHighContrast,
    setReducedMotion,
    resetToDefaults,
    updateColors,
  } = useThemeStore()

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement

    // Apply CSS custom properties for colors
    Object.entries(currentColors.primary).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, value)
    })

    Object.entries(currentColors.gray).forEach(([key, value]) => {
      root.style.setProperty(`--color-gray-${key}`, value)
    })

    root.style.setProperty('--color-success', currentColors.success)
    root.style.setProperty('--color-warning', currentColors.warning)
    root.style.setProperty('--color-error', currentColors.error)
    root.style.setProperty('--color-background', currentColors.background)
    root.style.setProperty('--color-surface', currentColors.surface)
    root.style.setProperty('--color-text-primary', currentColors.text.primary)
    root.style.setProperty('--color-text-secondary', currentColors.text.secondary)
    root.style.setProperty('--color-text-disabled', currentColors.text.disabled)

    // Apply font family
    root.style.setProperty('--font-family', FONT_FAMILIES[settings.fontFamily])

    // Apply font size
    root.style.setProperty('--font-size-base', `${settings.fontSize}px`)

    // Apply dark mode class
    if (isDarkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Apply high contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Apply reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    // Apply animation level
    root.setAttribute('data-animation-level', settings.animationLevel)

    // Apply card layout
    root.setAttribute('data-card-layout', settings.cardLayout)
  }, [settings, currentColors, isDarkMode])

  // Listen for system theme changes
  useEffect(() => {
    if (settings.mode !== 'auto') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      updateColors()
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [settings.mode, updateColors])

  // Listen for system reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => {
      if (mediaQuery.matches && !settings.reducedMotion) {
        setReducedMotion(true)
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    // Check initial state
    if (mediaQuery.matches && !settings.reducedMotion) {
      setReducedMotion(true)
    }

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [settings.reducedMotion, setReducedMotion])

  return {
    settings,
    currentColors,
    isDarkMode,
    actions: {
      setThemeMode,
      setColorScheme,
      setFontFamily,
      setFontSize,
      setCardLayout,
      setAnimationLevel,
      setHighContrast,
      setReducedMotion,
      resetToDefaults,
    },
  }
}
