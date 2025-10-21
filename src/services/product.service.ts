import type { Product, ProductList, ProductListQueryParams, SuccessResponse } from '@/types'
import { http } from '@/utils'
import type { AxiosResponse } from 'axios'

const URL = 'products'

const productService = {
  getProducts: (queryParams: ProductListQueryParams): Promise<AxiosResponse<SuccessResponse<ProductList>>> =>
    http.get<SuccessResponse<ProductList>>(URL, { params: queryParams }),

  getProductDetail: (id: string): Promise<AxiosResponse<SuccessResponse<Product>>> =>
    http.get<SuccessResponse<Product>>(`${URL}/${id}`)
}

export default productService
