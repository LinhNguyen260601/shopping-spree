import { PURCHASES_STATUS } from '@/constants'

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
