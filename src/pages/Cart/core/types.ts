import type { Purchase } from '@/types'

export interface ExtendedPurchases extends Purchase {
  checked: boolean
  disabled: boolean
}
