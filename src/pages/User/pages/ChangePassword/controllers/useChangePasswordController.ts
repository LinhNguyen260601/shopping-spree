import { PASSWORD_DEFAULT_VALUES, passwordSchema, type PasswordFormData } from '@/pages/User/pages/ChangePassword/core'
import { userService } from '@/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from '@/utils'
import type { ErrorResponse } from '@/types'

const useChangePasswordController = () => {
  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<PasswordFormData>({
    defaultValues: PASSWORD_DEFAULT_VALUES,
    resolver: yupResolver(passwordSchema),
    mode: 'onChange'
  })

  const { mutate, isPending } = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (data) => {
      reset()
      toast.success(data.data.message)
    }
  })

  const onSubmit = handleSubmit(async (data: PasswordFormData) => {
    try {
      mutate(omit(data, ['confirm_password']))
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<PasswordFormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof PasswordFormData, {
              message: formError[key as keyof PasswordFormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return {
    errors,
    isValid,
    isDirty,
    register,
    isSubmitting: isPending,
    onSubmit
  }
}

export default useChangePasswordController
