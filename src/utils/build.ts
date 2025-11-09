import { PATH } from '@/constants'
import type { QueryConfig } from '@/pages/ProductList/types'
import type { Path } from '@/types'
import type { ProductListQueryParams } from '@/types/product.type'
import { createSearchParams } from 'react-router-dom'

export const buildLinkWithUpdatedQuery = (
  queryConfig: QueryConfig,
  fieldOrUpdates: keyof ProductListQueryParams | Partial<ProductListQueryParams>,
  value?: string | number,
  path?: Path
) => {
  const updates = typeof fieldOrUpdates === 'object' ? fieldOrUpdates : { [fieldOrUpdates]: value }

  const updatedQueryConfig = {
    ...queryConfig,
    ...Object.fromEntries(Object.entries(updates).map(([key, value]) => [key, String(value)]))
  }

  return {
    pathname: path ?? PATH.HOME,
    search: createSearchParams({
      ...updatedQueryConfig
    }).toString()
  }
}
