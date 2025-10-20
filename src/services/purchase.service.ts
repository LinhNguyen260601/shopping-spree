import type { Purchase, PurchaseListStatus, SuccessResponse } from '@/types'
import { http } from '@/utils'

const URL = 'purchases'

const purchaseService = {
  addToCart: (body: { product_id: string; buy_count: number }) =>
    http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body),
  getPurchases: (params: { status: PurchaseListStatus }) =>
    http.get<SuccessResponse<Purchase[]>>(URL, {
      params
    })
}

export default purchaseService
