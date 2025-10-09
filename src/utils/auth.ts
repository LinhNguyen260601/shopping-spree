/**
 * Save access token to local storage
 * @param accessToken - Access token
 */
export const saveAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken)
}

/**
 * Clear access token from local storage
 */
export const clearAccessTokenFromLocalStorage = () => {
  localStorage.removeItem('access_token')
}

/**
 * Get access token from local storage
 * @returns Access token
 */
export const getAccessTokenFromLocalStorage = () => localStorage.getItem('access_token') ?? ''
