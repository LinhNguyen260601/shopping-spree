import { PATH } from '@/constants'
import { PRICE_RANGE_DEFAULT_VALUES } from '@/pages/ProductList/constants'
import { priceRangeSchema } from '@/pages/ProductList/schemas'
import type { PriceFormData, QueryConfig } from '@/pages/ProductList/types'
import { buildLinkWithUpdatedQuery } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'

const useAsideFilterController = (queryConfig: QueryConfig) => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<PriceFormData>({
    defaultValues: PRICE_RANGE_DEFAULT_VALUES,
    resolver: yupResolver(priceRangeSchema as any),
    shouldFocusError: false
  })

  const handleInputNumberChange = (field: keyof PriceFormData) => () => {
    trigger(field)
  }

  const handleRemoveLeftAsideFilter = useCallback(() => {
    navigate({
      pathname: PATH.HOME,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }, [navigate, queryConfig])

  const onSubmit = handleSubmit((data: PriceFormData) => {
    navigate(
      buildLinkWithUpdatedQuery(queryConfig, {
        price_min: data.price_min,
        price_max: data.price_max
      })
    )
  })

  return {
    control,
    errors,
    onSubmit,
    handleInputNumberChange,
    handleRemoveLeftAsideFilter
  }
}

export default useAsideFilterController
