import { emailField, passwordField } from '@/utils'
import { object } from 'yup'

export const loginSchema = object({
  email: emailField(),
  password: passwordField()
})
