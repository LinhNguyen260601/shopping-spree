import type { LoginFormData } from '@/pages/Login/types'
import type { RegisterFormData } from '@/pages/Register/types'
import type { SuccessResponse, User } from '@/types'
import { http } from '@/utils'
import type { AxiosResponse } from 'axios'

export const LOGIN_URL = 'login'
export const REGISTER_URL = 'register'
export const LOGOUT_URL = 'logout'
export const REFRESH_TOKEN_URL = 'refresh-access-token'

const authService = {
  registerAccount: (
    payload: Omit<RegisterFormData, 'passwordConfirm'>
  ): Promise<AxiosResponse<SuccessResponse<{ user: User }>>> =>
    http.post<SuccessResponse<{ user: User }>>(REGISTER_URL, payload),

  login: (payload: LoginFormData): Promise<AxiosResponse<SuccessResponse<{ user: User }>>> =>
    http.post<SuccessResponse<{ user: User }>>(LOGIN_URL, payload),

  logout: (): Promise<AxiosResponse<SuccessResponse<void>>> => http.post<SuccessResponse<void>>(LOGOUT_URL)
}

export default authService
