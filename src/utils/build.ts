import { type Path, PATH } from '@/constants'
import type { QueryConfig } from '@/pages/ProductList/types'
import type { ProductListQueryParams } from '@/types/product.type'
import { createSearchParams } from 'react-router-dom'

export const buildLinkWithUpdatedQuery = (
  queryConfig: QueryConfig,
  field: keyof ProductListQueryParams,
  value: string | number,
  path?: Path
) => ({
  pathname: path ?? PATH.HOME,
  search: createSearchParams({
    ...queryConfig,
    [field]: value
  }).toString()
})
