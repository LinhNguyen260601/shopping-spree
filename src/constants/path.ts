export const PATH = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
  PROFILE: '/profile',
  LOG_OUT: '/logout',
  PRODUCT_LIST: '/products'
} as const

export type Path = (typeof PATH)[keyof typeof PATH]
