import type { User } from '@/types'

/**
 * Save access token to local storage
 * @param accessToken - Access token
 */
export const saveAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken)
}

/**
 * Clear access token and user from local storage
 */
export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
}

/**
 * Get access token from local storage
 * @returns Access token
 */
export const getAccessTokenFromLocalStorage = () => localStorage.getItem('access_token') ?? ''

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
