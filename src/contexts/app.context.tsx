import type { User } from '@/types'
import { getAccessTokenFromLocalStorage, getUserFromLocalStorage } from '@/utils'
import { createContext } from 'react'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => {},
  user: getUserFromLocalStorage(),
  setUser: () => {}
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
