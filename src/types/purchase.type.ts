import type { Product } from '@/types/product.type'

// -1: Products are in cart
// 1: The product is waiting for confirmation from the shop owner.
// 2: Products are being picked up
// 3: Products are in transit
// 4: The product has been delivered.
// 5: The product has been cancelled.
export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

// 0: All products
export type PurchaseListStatus = 0 | PurchaseStatus

export interface Purchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: number
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}
