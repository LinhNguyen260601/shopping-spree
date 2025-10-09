import { PATH } from '@/constants/path'
import { AppContext } from '@/contexts'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const isAuthenticated = useContext(AppContext).isAuthenticated
  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}

export const RejectedRoute = () => {
  const isAuthenticated = useContext(AppContext).isAuthenticated
  return !isAuthenticated ? <Outlet /> : <Navigate to={PATH.HOME} />
}
