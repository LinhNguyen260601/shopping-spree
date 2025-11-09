import { registerSchema } from '@/pages/Register/schemas'
import type { InferType } from 'yup'

export type RegisterFormData = InferType<typeof registerSchema>
