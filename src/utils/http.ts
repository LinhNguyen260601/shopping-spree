import { PATH } from '@/constants'
import type { AuthResponse } from '@/types'
import {
  clearLocalStorage,
  getAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
  saveUserToLocalStorage
} from './auth'
import type { AxiosError, AxiosInstance } from 'axios'
import axios, { HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'

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
  constructor() {
    // Reason to create this variable instead of calling an api and get the access token because get the access token will get from the hard disk and create variable inside the class will get from the RAM. Get from the RAM is always faster than get from the hard disk.
    this.accessToken = getAccessTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
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
        if (url === PATH.LOGIN || url === PATH.REGISTER) {
          this.accessToken = data.data.access_token
          saveAccessTokenToLocalStorage(this.accessToken)
          saveUserToLocalStorage(data.data.user)
        }

        if (url === PATH.LOG_OUT) {
          this.accessToken = ''
          clearLocalStorage()
        }

        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }

        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLocalStorage()
        }

        return Promise.reject(error)
      }
    )
  }
}

export const http = new Http().instance
