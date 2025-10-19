import { PATH } from '@/constants'
import { AppContext } from '@/contexts'
import { useQueryConfig } from '@/hooks'
import { authService } from '@/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useCallback, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { object, string, type InferType } from 'yup'

const searchSchema = object({
  name: string().required('Tên sản phẩm không được để trống').trim()
})

type SearchFormData = InferType<typeof searchSchema>

const useHeaderController = () => {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(AppContext)

  const searchValue = searchParams.get('name') || ''

  const { register, handleSubmit } = useForm<SearchFormData>({
    defaultValues: {
      name: searchValue
    },
    resolver: yupResolver(searchSchema)
  })

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setUser(null)
    }
  })

  const handleLogout = useCallback(() => {
    logoutMutation.mutate()
  }, [logoutMutation])

  const handleSearch = handleSubmit((data: SearchFormData) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }

    navigate({
      pathname: PATH.HOME,
      search: createSearchParams(config).toString()
    })
  })

  return {
    user,
    register,
    isAuthenticated,
    handleLogout,
    handleSearch
  }
}

export default useHeaderController
