import { getAccessTokenFromLocalStorage } from '@/utils'
import { createContext } from 'react'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => {}
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
