import type { User } from '@/types'

export const localStorageEventTarget = new EventTarget()

/**
 * Save access token to local storage
 * @param accessToken - Access token
 */
export const saveAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken)
}

/**
 * Save refresh token to local storage
 * @param refreshToken - Refresh token
 */
export const saveRefreshTokenToLocalStorage = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

/**
 * Clear access token and user from local storage
 */
export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user')
  const clearLocalStorageEvent = new Event('clearLocalStorage')
  localStorageEventTarget.dispatchEvent(clearLocalStorageEvent)
}

/**
 * Get access token from local storage
 * @returns Access token
 */
export const getAccessTokenFromLocalStorage = () => localStorage.getItem('access_token') ?? ''

/**
 * Get refresh token from local storage
 * @returns Refresh token
 */
export const getRefreshTokenFromLocalStorage = () => localStorage.getItem('refresh_token') ?? ''

/**
 * Get user from local storage
 * @returns User
 */
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

/**
 * Save user to local storage
 * @param user - User
 */
export const saveUserToLocalStorage = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user))
}
