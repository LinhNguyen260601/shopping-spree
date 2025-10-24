import { PATH } from '@/constants'
import { AppContext } from '@/contexts'
import { LOGIN_DEFAULT_VALUES } from '@/pages/Login/constants'
import { loginSchema } from '@/pages/Login/schemas'
import type { LoginFormData } from '@/pages/Login/types'
import { authService } from '@/services'
import type { ErrorResponse } from '@/types'
import { isAxiosUnprocessableEntityError } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const useLoginController = () => {
  const { setIsAuthenticated, setUser } = useContext(AppContext)
  const navigate = useNavigate()
  const form = useForm<LoginFormData>({
    defaultValues: LOGIN_DEFAULT_VALUES,
    resolver: yupResolver(loginSchema),
    mode: 'onChange'
  })

  const { handleSubmit, setError, formState, register } = form

  const loginMutation = useMutation({
    mutationFn: (body: LoginFormData) => authService.login(body)
  })

  const onSubmit = handleSubmit((data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setUser(data.data.data.user)
        navigate(PATH.HOME)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<LoginFormData>>(error)) {
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

  const handlePreloadRegisterLayout = () => {
    import('@/layouts/RegisterLayout')
    import('@/pages/Login')
  }

  return {
    register,
    formState,
    isSubmitting: loginMutation.isPending,
    onSubmit,
    handlePreloadRegisterLayout
  }
}

export default useLoginController
