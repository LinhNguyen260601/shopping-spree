import { SORT_ORDER } from '@/constants'
import type { PriceFormData } from '@/pages/ProductList/types'

export const PRICE_OPTIONS = [
  {
    value: '',
    label: 'Giá'
  },
  {
    value: SORT_ORDER.ASC,
    label: 'Giá: Thấp đến cao'
  },
  {
    value: SORT_ORDER.DESC,
    label: 'Giá: Cao đến thấp'
  }
]

export const PRICE_RANGE_DEFAULT_VALUES: PriceFormData = {
  price_min: '',
  price_max: ''
}
