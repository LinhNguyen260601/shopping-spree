import type { QUERY_KEY } from '@/constants'

export type QueryKey = (typeof QUERY_KEY)[keyof typeof QUERY_KEY]
