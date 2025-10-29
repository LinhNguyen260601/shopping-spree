import { ref, string } from 'yup'

/**
 * Email field schema
 * @returns Email field schema
 */
export const emailField = () =>
  string()
    .email('Email không hợp lệ')
    .required('Email không được để trống')
    .min(5, 'Email phải có ít nhất 5 ký tự')
    .max(160, 'Email không được vượt quá 160 ký tự')

/**
 * Password field schema
 * @returns Password field schema
 */
export const passwordField = () =>
  string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(160, 'Mật khẩu không được vượt quá 160 ký tự')
    .required('Mật khẩu không được để trống')

/**
 * Password confirm field schema
 * @returns Password confirm field schema
 */
export const passwordConfirmField = (field: 'password' | 'new_password' = 'password') =>
  string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(160, 'Mật khẩu không được vượt quá 160 ký tự')
    .required('Mật khẩu không được để trống')
    .oneOf([ref(field)], 'Mật khẩu không khớp')
