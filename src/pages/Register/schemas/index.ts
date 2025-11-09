import { emailField, passwordConfirmField, passwordField } from '@/utils'
import { object } from 'yup'

export const registerSchema = object({
  email: emailField(),
  password: passwordField(),
  passwordConfirm: passwordConfirmField()
})
