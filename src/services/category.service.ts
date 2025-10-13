import type { Category, SuccessResponse } from '@/types'
import { http } from '@/utils'

const URL = 'categories'

const categoryService = {
  getCategories: () => http.get<SuccessResponse<Category[]>>(URL)
}

export default categoryService
