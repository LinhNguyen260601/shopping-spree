import type { LoginFormData } from '@/pages/Login/types'
import type { RegisterFormData } from '@/pages/Register/types'
import type { AuthResponse } from '@/types'
import { http } from '@/utils'

export const registerAccount = (payload: Omit<RegisterFormData, 'passwordConfirm'>) =>
  http.post<AuthResponse>('/register', payload)

export const login = (payload: LoginFormData) => http.post<AuthResponse>('/login', payload)

export const logout = () => http.post('/logout')
