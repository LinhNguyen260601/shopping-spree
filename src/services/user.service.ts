import type { BodyUpdateProfile } from '@/pages/User/core'
import type { SuccessResponse, User } from '@/types'
import { http } from '@/utils'
import type { AxiosResponse } from 'axios'

const userService = {
  getProfile: (): Promise<AxiosResponse<SuccessResponse<User>>> => http.get<SuccessResponse<User>>('me'),

  updateProfile: (body: BodyUpdateProfile): Promise<AxiosResponse<SuccessResponse<User>>> =>
    http.put<SuccessResponse<User>>('user', body),

  uploadAvatar: (body: File): Promise<AxiosResponse<SuccessResponse<string>>> => {
    const formData = new FormData()
    formData.append('image', body)

    return http.post<SuccessResponse<string>>('user/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userService
