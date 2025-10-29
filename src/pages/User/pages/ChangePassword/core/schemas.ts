import { userSchema } from '@/pages/User/core'

export const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])
