export const PATH = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
  PROFILE: '/profile'
} as const

export type Path = (typeof PATH)[keyof typeof PATH]
