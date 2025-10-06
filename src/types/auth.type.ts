import type { User } from '@/types/user.type'
import type { ApiResponse } from '@/types/utils.type'

export type AuthResponse = ApiResponse<{
  access_token: string
  expires: string
  user: User
}>
