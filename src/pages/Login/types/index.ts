import type { loginSchema } from '@/pages/Login/schemas'
import type { InferType } from 'yup'

export type LoginFormData = InferType<typeof loginSchema>
