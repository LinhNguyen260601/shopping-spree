import type { SortBy, SortOrder } from '@/constants'
import type { Category } from '@/types/category.type'

export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string
  category: Category
  image: string
  createdAt: string
  updatedAt: string
}

export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListQueryParams {
  page?: number
  limit?: number
  sort_by?: SortBy
  order?: SortOrder
  exclude?: string
  rating_filter?: number
  price_max?: number
  price_min?: number
  name?: string
}
