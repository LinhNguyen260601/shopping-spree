import type { RegisterFormData } from '@/pages/Register/types'
import type { AuthResponse } from '@/types'
import { http } from '@/utils'

export const registerAccount = async (payload: Omit<RegisterFormData, 'passwordConfirm'>) =>
  await http.post<AuthResponse>('/register', payload)
