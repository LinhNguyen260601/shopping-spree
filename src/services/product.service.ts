import type { Product, ProductList, ProductListQueryParams, SuccessResponse } from '@/types'
import { http } from '@/utils'

const URL = 'products'

const productService = {
  getProducts: (queryParams: ProductListQueryParams) =>
    http.get<SuccessResponse<ProductList>>(URL, { params: queryParams }),
  getProductDetail: (id: string) => http.get<SuccessResponse<Product>>(`${URL}/${id}`)
}

export default productService
