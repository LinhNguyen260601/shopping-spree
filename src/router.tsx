import { PATH } from '@/constants/path'
import { ProtectedRoute, RejectedRoute } from '@/guards'
import MainLayout from '@/layouts/MainLayout'
import RegisterLayout from '@/layouts/RegisterLayout'
import RootLayout from '@/layouts/RootLayout'
import ProductList from '@/pages/ProductList'
import { productService } from '@/services'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
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
            lazy: async () => {
              const { default: Profile } = await import('@/pages/Profile')
              return {
                element: (
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                )
              }
            }
          },
          {
            path: PATH.PRODUCT_DETAILS,
            lazy: async () => {
              const { default: ProductDetails } = await import('@/pages/ProductDetails')
              return {
                element: (
                  <MainLayout>
                    <ProductDetails />
                  </MainLayout>
                ),
                loader: ({ params }) => productService.getProductDetail(params.id as string)
              }
            }
          }
        ]
      },
      {
        path: '',
        element: <RejectedRoute />,
        children: [
          {
            path: PATH.LOGIN,
            lazy: async () => {
              const { default: Login } = await import('@/pages/Login')
              return {
                element: (
                  <RegisterLayout>
                    <Login />
                  </RegisterLayout>
                )
              }
            }
          },
          {
            path: PATH.REGISTER,
            lazy: async () => {
              const { default: Register } = await import('@/pages/Register')
              return {
                element: (
                  <RegisterLayout>
                    <Register />
                  </RegisterLayout>
                )
              }
            }
          }
        ]
      }
    ]
  }
])

export default router
