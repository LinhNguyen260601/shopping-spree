import type { DateSelectNameType, ProfileFormData } from '@/pages/User/core/types'
import range from 'lodash/range'

export const PROFILE_DEFAULT_VALUES: ProfileFormData = {
  name: '',
  phone: '',
  address: '',
  avatar: '',
  date_of_birth: new Date(1990, 0, 1)
}

export const DATE_SELECTS: {
  label: string
  name: DateSelectNameType
  options: number[]
}[] = [
  {
    label: 'Ngày',
    name: 'date',
    options: range(1, 32)
  },
  {
    label: 'Tháng',
    name: 'month',
    options: range(1, 13)
  },
  {
    label: 'Năm',
    name: 'year',
    options: range(1990, new Date().getFullYear() + 1).reverse()
  }
]
