import { passwordConfirmField, passwordField } from '@/utils'
import { date, object, string } from 'yup'

export const userSchema = object({
  name: string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: string().max(20, 'Độ dài tối đa là 20 ký tự'),
  address: string().max(160, 'Độ dài tối đa là 160 ký tự'),
  avatar: string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  date_of_birth: date().max(new Date(), 'Hãy chọn một trong quá khứ'),
  password: passwordField(),
  new_password: passwordField(),
  confirm_password: passwordConfirmField()
})

export const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])
