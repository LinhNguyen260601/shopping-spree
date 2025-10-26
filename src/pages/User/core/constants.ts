import type { ProfileFormData } from '@/pages/User/core/types'

export const PROFILE_DEFAULT_VALUES: ProfileFormData = {
  name: '',
  phone: '',
  address: '',
  avatar: '',
  date_of_birth: new Date(1990, 0, 1)
}
