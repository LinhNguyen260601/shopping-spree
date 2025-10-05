export const PATH = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/'
} as const

export type Path = (typeof PATH)[keyof typeof PATH]
