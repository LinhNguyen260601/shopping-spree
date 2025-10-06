import { PATH } from '@/constants'
import { LOGIN_DEFAULT_VALUES } from '@/pages/Login/constants'
import { loginSchema } from '@/pages/Login/schemas'
import type { LoginFormData } from '@/pages/Login/types'
import { login } from '@/services'
import type { ApiResponse } from '@/types'
import { isAxiosUnprocessableEntityError } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const useLoginController = () => {
  const navigate = useNavigate()
  const form = useForm<LoginFormData>({
    defaultValues: LOGIN_DEFAULT_VALUES,
    resolver: yupResolver(loginSchema),
    mode: 'onChange'
  })

  const { handleSubmit, setError, formState, register } = form

  const loginMutation = useMutation({
    mutationFn: (body: LoginFormData) => login(body)
  })

  const onSubmit = handleSubmit((data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate(PATH.HOME)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ApiResponse<LoginFormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof LoginFormData, {
                message: formError[key as keyof LoginFormData],
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
    isSubmitting: loginMutation.isPending,
    onSubmit
  }
}

export default useLoginController
