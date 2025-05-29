import { useRef, type ChangeEvent, type KeyboardEvent } from 'react'

import { useUserStore } from '@store/userStore'
import { usePlaylistStore } from '@store/playlistStore'

const DEFAULT_AVATAR_URL = 'https://ui-avatars.com/api/?name='

type AvatarChangeEvent = ChangeEvent<HTMLInputElement>
type UsernameChangeEvent = ChangeEvent<HTMLInputElement>
type KeyboardButtonEvent = KeyboardEvent<HTMLButtonElement>

const UserProfilePage = () => {
  const user = useUserStore(state => state.user)
  const setUsername = useUserStore(state => state.setUsername)
  const setAvatar = useUserStore(state => state.setAvatar)
  const resetUser = useUserStore(state => state.resetUser)

  const playlists = usePlaylistStore(state => state.playlists)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleUsernameChange = (e: UsernameChangeEvent): void => {
    setUsername(e.target.value)
  }

  const handleAvatarChange = (e: AvatarChangeEvent): void => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (): void => {
      setAvatar(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleAvatarClick = (): void => {
    fileInputRef.current?.click()
  }

  const handleAvatarKeyDown = (e: KeyboardButtonEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleAvatarClick()
    }
  }

  const handleResetKeyDown = (e: KeyboardButtonEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      resetUser()
    }
  }

  const totalCards = playlists.reduce((acc, p) => acc + p.cards.length, 0)

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mt-8">
      <div className="flex flex-col items-center mb-4">
        <div className="relative w-24 h-24 mb-2">
          <img
            src={user.avatar || `${DEFAULT_AVATAR_URL}${encodeURIComponent(user.username)}`}
            alt={`${user.username}'s avatar`}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
          />
          <button
            className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 text-xs hover:bg-primary/90 transition-colors"
            onClick={handleAvatarClick}
            onKeyDown={handleAvatarKeyDown}
            aria-label="Change avatar"
            tabIndex={0}
          >
            Edit
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
            aria-label="Avatar upload"
          />
        </div>
        <input
          type="text"
          value={user.username}
          onChange={handleUsernameChange}
          className="text-xl font-semibold text-center border-b-2 focus:outline-none focus:border-primary transition-colors"
          aria-label="Username"
          placeholder="Enter username"
        />
        <div className="text-xs text-gray-500 mt-1">
          Joined: {new Date(user.createdAt).toLocaleDateString()}
        </div>
      </div>
      <div className="mt-4">
        <div className="font-semibold mb-2">Stats</div>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>Total playlists: {playlists.length}</li>
          <li>Total cards: {totalCards}</li>
        </ul>
      </div>
      <button
        className="mt-6 w-full bg-danger text-white py-2 rounded-lg hover:bg-danger/90 transition-colors"
        onClick={resetUser}
        onKeyDown={handleResetKeyDown}
        aria-label="Reset profile"
        tabIndex={0}
      >
        Reset Profile
      </button>
    </div>
  )
}

export default UserProfilePage
