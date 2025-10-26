import type { userSchema } from '@/pages/User/core/schemas'
import type { User } from '@/types'
import type { InferType } from 'yup'
import type { profileSchema } from '@/pages/User/core/schemas'

export interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password: string
  new_password: string
}

export type UserFormData = InferType<typeof userSchema>

export type ProfileFormData = InferType<typeof profileSchema>
