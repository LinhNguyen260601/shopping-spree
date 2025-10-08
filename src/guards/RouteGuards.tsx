import { PATH } from '@/constants/path'
import { Navigate, Outlet } from 'react-router-dom'

const isAuthenticated = false

export const ProtectedRoute = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}

export const RejectedRoute = () => {
  return !isAuthenticated ? <Outlet /> : <Navigate to={PATH.HOME} />
}
