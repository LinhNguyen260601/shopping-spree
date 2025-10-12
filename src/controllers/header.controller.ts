import { AppContext } from '@/contexts'
import { authService } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useContext } from 'react'

const useHeaderController = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(AppContext)

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setUser(null)
    }
  })

  const handleLogout = useCallback(() => {
    logoutMutation.mutate()
  }, [logoutMutation.mutate])

  return {
    user,
    isAuthenticated,
    handleLogout
  }
}

export default useHeaderController
