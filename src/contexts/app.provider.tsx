import { useState } from 'react'
import { AppContext, initialAppContext } from './app.context'
import type { User } from '@/types'
import type { ExtendedPurchases } from '@/pages/Cart/core'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [user, setUser] = useState<User | null>(initialAppContext.user)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>(initialAppContext.extendedPurchases)

  const providerValue = { isAuthenticated, setIsAuthenticated, user, setUser, extendedPurchases, setExtendedPurchases }

  return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
}
