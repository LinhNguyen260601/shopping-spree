export const SORT_BY = {
  CREATED_AT: 'createdAt',
  PRICE: 'price',
  SOLD: 'sold',
  VIEW: 'view'
} as const

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc'
} as const

export type SortBy = (typeof SORT_BY)[keyof typeof SORT_BY]

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER]
