import type { ProductListQueryParams } from '@/types'
import type { NoUndefinedField } from '@/utils'

export type QueryConfig = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof ProductListQueryParams]: string
}

export type PriceFormData = NoUndefinedField<Pick<ProductListQueryParams, 'price_min' | 'price_max'>>
