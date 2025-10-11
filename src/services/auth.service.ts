import type { LoginFormData } from '@/pages/Login/types'
import type { RegisterFormData } from '@/pages/Register/types'
import type { AuthResponse } from '@/types'
import { http } from '@/utils'

const authService = {
  registerAccount: (payload: Omit<RegisterFormData, 'passwordConfirm'>) =>
    http.post<AuthResponse>('/register', payload),
  login: (payload: LoginFormData) => http.post<AuthResponse>('/login', payload),
  logout: () => http.post('/logout')
}

export default authService
