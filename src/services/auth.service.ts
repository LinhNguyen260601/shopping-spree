import type { LoginFormData } from '@/pages/Login/types'
import type { RegisterFormData } from '@/pages/Register/types'
import type { SuccessResponse, User } from '@/types'
import { http } from '@/utils'
import type { AxiosResponse } from 'axios'

const authService = {
  registerAccount: (
    payload: Omit<RegisterFormData, 'passwordConfirm'>
  ): Promise<AxiosResponse<SuccessResponse<{ user: User }>>> =>
    http.post<SuccessResponse<{ user: User }>>('/register', payload),

  login: (payload: LoginFormData): Promise<AxiosResponse<SuccessResponse<{ user: User }>>> =>
    http.post<SuccessResponse<{ user: User }>>('/login', payload),

  logout: (): Promise<AxiosResponse<SuccessResponse<void>>> => http.post<SuccessResponse<void>>('/logout')
}

export default authService
