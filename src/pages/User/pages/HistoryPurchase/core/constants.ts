import { PURCHASES_STATUS } from '@/constants'
import type { TFunction } from 'i18next'

export const PURCHASE_TABS = [
  {
    status: PURCHASES_STATUS.ALL,
    label: 'Tất cả'
  },
  {
    status: PURCHASES_STATUS.WAITING_FOR_CONFIRMATION,
    label: 'Chờ xác nhận'
  },
  {
    status: PURCHASES_STATUS.PICKING_UP,
    label: 'Chờ lấy hàng'
  },
  {
    status: PURCHASES_STATUS.IN_TRANSIT,
    label: 'Đang giao'
  },
  {
    status: PURCHASES_STATUS.DELIVERED,
    label: 'Đã giao'
  },
  {
    status: PURCHASES_STATUS.CANCELLED,
    label: 'Đã hủy'
  }
]

export const GET_TAB_LABEL = (t: TFunction<'user'>, tabStatus: number) => {
  const labels: Record<number, string> = {
    [PURCHASES_STATUS.ALL]: t('purchaseHistory.all'),
    [PURCHASES_STATUS.WAITING_FOR_CONFIRMATION]: t('purchaseHistory.waitingForConfirmation'),
    [PURCHASES_STATUS.PICKING_UP]: t('purchaseHistory.pickingUp'),
    [PURCHASES_STATUS.IN_TRANSIT]: t('purchaseHistory.inTransit'),
    [PURCHASES_STATUS.DELIVERED]: t('purchaseHistory.delivered'),
    [PURCHASES_STATUS.CANCELLED]: t('purchaseHistory.cancelled')
  }
  return labels[tabStatus] || tabStatus.toString()
}
