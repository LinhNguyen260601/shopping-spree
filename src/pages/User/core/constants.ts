import { PATH } from '@/constants'
import type { DateSelectNameType, ProfileFormData } from '@/pages/User/core/types'
import type { Path } from '@/types'
import range from 'lodash/range'
import { LockKeyhole, ReceiptText, User, type LucideProps } from 'lucide-react'

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

export const MAX_SIZE_UPLOAD_AVATAR = 1048576

export const ASIDE_NAV_ITEMS: { path: Path; icon: React.ComponentType<LucideProps>; label: string }[] = [
  {
    path: PATH.PROFILE,
    icon: User,
    label: 'Tài khoản của tôi'
  },
  {
    path: PATH.CHANGE_PASSWORD,
    icon: LockKeyhole,
    label: 'Đổi mật khẩu'
  },
  {
    path: PATH.HISTORY_PURCHASE,
    icon: ReceiptText,
    label: 'Đơn mua'
  }
]
