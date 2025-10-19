import { SORT_BY } from '@/constants'
import useQueryParams from '@/hooks/useQueryParams'
import type { QueryConfig } from '@/pages/ProductList/types'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'

const useQueryConfig = () => {
  const queryParams: QueryConfig = useQueryParams()

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '20',
      sort_by: queryParams.sort_by || SORT_BY.CREATED_AT,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined
  )

  return queryConfig
}

export default useQueryConfig
