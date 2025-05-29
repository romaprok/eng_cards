// App Configuration
export const APP_NAME = 'English Cards'
export const APP_VERSION = '1.0.0'

// Local Storage Keys
export const STORAGE_KEYS = {
  PLAYLISTS: 'eng-cards-playlists',
  USER: 'eng-cards-user',
  THEME: 'eng-cards-theme',
} as const

// Default Values
export const DEFAULT_AVATAR_URL = 'https://ui-avatars.com/api/?name='

// SM-2 Algorithm Constants
export const SM2_CONSTANTS = {
  INITIAL_EASE_FACTOR: 2.5,
  MINIMUM_EASE_FACTOR: 1.3,
  INITIAL_INTERVAL: 1,
  MINIMUM_INTERVAL: 1,
  EASE_FACTOR_ADJUSTMENT: {
    AGAIN: -0.8,
    HARD: -0.15,
    GOOD: 0,
    EASY: 0.15,
  },
  INTERVAL_MULTIPLIERS: {
    AGAIN: 0.2,
    HARD: 1.2,
    GOOD: 1,
    EASY: 1.3,
  },
} as const

// Card Status
export const CARD_STATUS = {
  NEW: 'new',
  LEARNING: 'learning',
  MASTERED: 'mastered',
} as const

// Difficulty Ratings
export const DIFFICULTY_RATINGS = {
  AGAIN: 'again',
  HARD: 'hard',
  GOOD: 'good',
  EASY: 'easy',
} as const

// UI Constants
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const
