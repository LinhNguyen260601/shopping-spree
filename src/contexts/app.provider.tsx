import { useState } from 'react'
import { AppContext, initialAppContext } from './app.context'
import type { User } from '@/types'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [user, setUser] = useState<User | null>(initialAppContext.user)

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>{children}</AppContext.Provider>
  )
}
