import type { Purchase, PurchaseListStatus, SuccessResponse } from '@/types'
import { http } from '@/utils'
import type { AxiosResponse } from 'axios'

const URL = 'purchases'

const purchaseService = {
  addToCart: (body: { product_id: string; buy_count: number }): Promise<AxiosResponse<SuccessResponse<Purchase>>> =>
    http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body),

  getPurchases: (params: { status: PurchaseListStatus }): Promise<AxiosResponse<SuccessResponse<Purchase[]>>> =>
    http.get<SuccessResponse<Purchase[]>>(URL, {
      params
    }),

  buyProducts: (
    body: { product_id: string; buy_count: number }[]
  ): Promise<AxiosResponse<SuccessResponse<Purchase[]>>> =>
    http.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body),

  updatePurchase: (body: {
    product_id: string
    buy_count: number
  }): Promise<AxiosResponse<SuccessResponse<Purchase>>> =>
    http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body),

  deletePurchase: (purchaseIds: string[]): Promise<AxiosResponse<SuccessResponse<{ deleted_count: number }>>> =>
    http.delete<SuccessResponse<{ deleted_count: number }>>(`${URL}`, { data: purchaseIds })
}

export default purchaseService
