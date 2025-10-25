import { PATH } from '@/constants/path'
import { ProtectedRoute, RejectedRoute } from '@/guards'
import MainLayout from '@/layouts/MainLayout'
import RootLayout from '@/layouts/RootLayout'
import ProductList from '@/pages/ProductList'
import { productService } from '@/services'
import { getIdFromNameId } from '@/utils'
import { lazy } from 'react'
import { createBrowserRouter, ScrollRestoration } from 'react-router-dom'

const CartLayout = lazy(() => import('@/layouts/CartLayout'))
const RegisterLayout = lazy(() => import('@/layouts/RegisterLayout'))
const UserLayout = lazy(() => import('@/pages/User/layouts/UserLayout'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <RootLayout />
        <ScrollRestoration />
      </>
    ),
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
            path: PATH.USER,
            element: (
              <MainLayout>
                <UserLayout />
              </MainLayout>
            ),
            children: [
              {
                path: PATH.PROFILE,
                lazy: async () => {
                  const { default: Profile } = await import('@/pages/User/pages/Profile')
                  return {
                    element: <Profile />
                  }
                }
              },
              {
                path: PATH.CHANGE_PASSWORD,
                lazy: async () => {
                  const { default: ChangePassword } = await import('@/pages/User/pages/ChangePassword')
                  return {
                    element: <ChangePassword />
                  }
                }
              },
              {
                path: PATH.HISTORY_PURCHASE,
                lazy: async () => {
                  const { default: HistoryPurchase } = await import('@/pages/User/pages/HistoryPurchase')
                  return {
                    element: <HistoryPurchase />
                  }
                }
              }
            ]
          },
          {
            path: PATH.CART,
            lazy: async () => {
              const { default: Cart } = await import('@/pages/Cart')
              return {
                element: (
                  <CartLayout>
                    <Cart />
                  </CartLayout>
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
                loader: ({ params }) => productService.getProductDetail(getIdFromNameId(params.nameId as string))
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
