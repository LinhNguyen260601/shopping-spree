import type { User } from '@/types/user.type'
import type { SuccessResponse } from '@/types/utils.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: string
  user: User
}>
