import { QUERY_KEY } from '@/constants'
import { useQueryParams } from '@/hooks'
import type { QueryConfig } from '@/pages/ProductList/types'
import { categoryService, productService } from '@/services'
import type { ProductListQueryParams } from '@/types'
import { useQuery } from '@tanstack/react-query'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'

const useProductListController = () => {
  const queryParams: QueryConfig = useQueryParams()

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '20',
      sort_by: queryParams.sort_by,
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

  const {
    data: productsData,
    isLoading,
    error
  } = useQuery({
    queryKey: [QUERY_KEY.PRODUCTS, queryConfig],
    queryFn: () => productService.getProducts(queryConfig as ProductListQueryParams),
    placeholderData: (previousData) => previousData
  })

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: [QUERY_KEY.CATEGORIES],
    queryFn: () => categoryService.getCategories()
  })

  return {
    error,
    isLoading,
    queryConfig,
    productsData,
    categoriesData,
    isLoadingCategories
  }
}

export default useProductListController
