import { LOGIN_URL, LOGOUT_URL, REFRESH_TOKEN_URL, REGISTER_URL } from '@/services/auth.service'
import type { AuthResponse, ErrorResponse, RefreshTokenResponse } from '@/types'
import { isAxiosUnauthorizedError, isTokenExpired } from '@/utils/axiosError'
import type { AxiosError, AxiosInstance } from 'axios'
import axios, { HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import {
  clearLocalStorage,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
  saveRefreshTokenToLocalStorage,
  saveUserToLocalStorage
} from './auth'

/**
 * Http class
 * @class Http
 * @classdesc Http class
 * @example
 * const http = new Http().instance
 * http.get('/api/v1/users')
 */
class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    // Reason to create this variable instead of calling an api and get the access token because get the access token will get from the hard disk and create variable inside the class will get from the RAM. Get from the RAM is always faster than get from the hard disk.
    this.accessToken = getAccessTokenFromLocalStorage()
    this.refreshToken = getRefreshTokenFromLocalStorage()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 15 * 60,
        'expire-refresh-token': 60 * 60
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken
          return config
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        const data = response.data as AuthResponse
        if (url === LOGIN_URL || url === REGISTER_URL) {
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          saveAccessTokenToLocalStorage(this.accessToken)
          saveRefreshTokenToLocalStorage(this.refreshToken)
          saveUserToLocalStorage(data.data.user)
        }

        if (url === LOGOUT_URL) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLocalStorage()
        }

        return response
      },
      (error: AxiosError) => {
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config
          const url = config?.url
          // Token expired and request is not the refresh token and this refresh token don't call refresh token
          if (isTokenExpired(error) && url !== REFRESH_TOKEN_URL) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  this.refreshTokenRequest = null
                })
            return this.refreshTokenRequest.then((access_token) =>
              // Continue to the call old request that just met an error
              this.instance({ ...config, headers: { ...config?.headers, Authorization: access_token } })
            )
          }

          clearLocalStorage()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
        }

        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken = () =>
    this.instance
      .post<RefreshTokenResponse>(REFRESH_TOKEN_URL, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        saveAccessTokenToLocalStorage(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLocalStorage()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
}

export const http = new Http().instance
