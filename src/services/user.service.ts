import type { BodyUpdateProfile } from '@/pages/User/core'
import type { SuccessResponse, User } from '@/types'
import { http } from '@/utils'
import type { AxiosResponse } from 'axios'

const userService = {
  getProfile: (): Promise<AxiosResponse<SuccessResponse<User>>> => http.get<SuccessResponse<User>>('me'),

  updateProfile: (body: BodyUpdateProfile): Promise<AxiosResponse<SuccessResponse<User>>> =>
    http.put<SuccessResponse<User>>('user', body),

  uploadAvatar: (body: FormData): Promise<AxiosResponse<SuccessResponse<string>>> =>
    http.post<SuccessResponse<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}

export default userService
