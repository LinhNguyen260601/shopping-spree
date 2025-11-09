import { PATH } from '@/constants'
import useQueryConfig from '@/hooks/useQueryConfig'
import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { object, string, type InferType } from 'yup'

const searchSchema = object({
  name: string().required('Tên sản phẩm không được để trống').trim()
})

type SearchFormData = InferType<typeof searchSchema>

const useSearchProducts = () => {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const [searchParams] = useSearchParams()
  const searchValue = searchParams.get('name') || ''

  const { register, handleSubmit } = useForm<SearchFormData>({
    defaultValues: {
      name: searchValue
    },
    resolver: yupResolver(searchSchema)
  })

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

  return { register, handleSearch }
}

export default useSearchProducts
