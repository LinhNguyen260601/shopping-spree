import type { Category, SuccessResponse } from '@/types'
import { http } from '@/utils'
import type { AxiosResponse } from 'axios'

const URL = 'categories'

const categoryService = {
  getCategories: (): Promise<AxiosResponse<SuccessResponse<Category[]>>> => http.get<SuccessResponse<Category[]>>(URL)
}

export default categoryService
