import type { passwordSchema } from '@/pages/User/pages/ChangePassword/core/schemas'
import type { InferType } from 'yup'

export type PasswordFormData = InferType<typeof passwordSchema>
