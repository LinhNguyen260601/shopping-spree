import type { ExtendedPurchases } from '@/pages/Cart/core'
import type { User } from '@/types'
import { getAccessTokenFromLocalStorage, getUserFromLocalStorage } from '@/utils'
import { createContext } from 'react'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchases[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchases[]>>
  reset: () => void
}

export const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => {},
  user: getUserFromLocalStorage(),
  setUser: () => {},
  extendedPurchases: [],
  setExtendedPurchases: () => {},
  reset: () => {}
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
