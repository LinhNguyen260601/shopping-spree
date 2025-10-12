import type { ProductListQueryParams } from '@/types'

export type QueryConfig = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof ProductListQueryParams]: string
}
