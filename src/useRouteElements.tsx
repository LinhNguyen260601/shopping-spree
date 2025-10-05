import { PATH } from '@/constants/path'
import RegisterLayout from '@/layouts/RegisterLayout'
import Login from '@/pages/Login'
import ProductList from '@/pages/ProductList'
import Register from '@/pages/Register'
import { useRoutes } from 'react-router-dom'

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: PATH.HOME,
      element: <ProductList />
    },
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
  ])

  return routeElements
}

export default useRouteElements
