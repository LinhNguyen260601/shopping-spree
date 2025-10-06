import { PATH } from '@/constants'
import { REGISTER_DEFAULT_VALUES } from '@/pages/Register/constants'
import { registerSchema } from '@/pages/Register/schemas'
import type { RegisterFormData } from '@/pages/Register/types'
import { registerAccount } from '@/services'
import type { ApiResponse } from '@/types'
import { isAxiosUnprocessableEntityError } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const useRegisterController = () => {
  const navigate = useNavigate()

  const form = useForm<RegisterFormData>({
    defaultValues: REGISTER_DEFAULT_VALUES,
    resolver: yupResolver(registerSchema),
    mode: 'onChange'
  })

  const { handleSubmit, setError, formState, register } = form

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<RegisterFormData, 'passwordConfirm'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data: RegisterFormData) => {
    const body = omit(data, 'passwordConfirm')
    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        navigate(PATH.LOGIN)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ApiResponse<Omit<RegisterFormData, 'passwordConfirm'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<RegisterFormData, 'passwordConfirm'>, {
                message: formError[key as keyof Omit<RegisterFormData, 'passwordConfirm'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return {
    register,
    formState,
    onSubmit
  }
}

export default useRegisterController
