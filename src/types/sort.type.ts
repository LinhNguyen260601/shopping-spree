import type { SORT_BY, SORT_ORDER } from '@/constants'

export type SortBy = (typeof SORT_BY)[keyof typeof SORT_BY]

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER]
