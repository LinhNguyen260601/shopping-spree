import type { PATH } from '@/constants'

export type Path = (typeof PATH)[keyof typeof PATH]
