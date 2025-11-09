import { QUERY_KEY } from '@/constants'
import { useQueryConfig } from '@/hooks'
import { categoryService, productService } from '@/services'
import type { ProductListQueryParams } from '@/types'
import { useQuery } from '@tanstack/react-query'

const useProductListController = () => {
  const queryConfig = useQueryConfig()

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
