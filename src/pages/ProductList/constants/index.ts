import { SORT_ORDER } from '@/constants'

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
