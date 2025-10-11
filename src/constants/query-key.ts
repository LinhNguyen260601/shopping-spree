export const QUERY_KEY = {
  PRODUCTS: 'products'
} as const

export type QueryKey = (typeof QUERY_KEY)[keyof typeof QUERY_KEY]
