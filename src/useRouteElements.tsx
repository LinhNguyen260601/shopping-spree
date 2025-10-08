import { PATH } from '@/constants/path'
import { ProtectedRoute, RejectedRoute } from '@/guards'
import MainLayout from '@/layouts/MainLayout'
import RegisterLayout from '@/layouts/RegisterLayout'
import Login from '@/pages/Login'
import ProductList from '@/pages/ProductList'
import Profile from '@/pages/Profile'
import Register from '@/pages/Register'
import { useRoutes } from 'react-router-dom'

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: PATH.HOME,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: PATH.PROFILE,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: PATH.LOGIN,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: PATH.REGISTER,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])

  return routeElements
}

export default useRouteElements
