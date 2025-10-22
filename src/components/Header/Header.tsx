import Badge from '@/components/Badge'
import Button from '@/components/Button'
import Popover from '@/components/Popover'
import { PATH, PURCHASES_STATUS, QUERY_KEY } from '@/constants'
import { AppContext } from '@/contexts'
import { useQueryConfig } from '@/hooks'
import { authService, purchaseService } from '@/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { ChevronDown, Earth, Handbag, Search, ShoppingCart } from 'lucide-react'
import { useCallback, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { object, string, type InferType } from 'yup'
import noProductImage from '@/assets/images/no-product.webp'
import { formatCurrency } from '@/utils'
import queryClient from '@/queryClient'

const searchSchema = object({
  name: string().required('Tên sản phẩm không được để trống').trim()
})

type SearchFormData = InferType<typeof searchSchema>

const MAX_PURCHASES_IN_CART = 5

const Header = () => {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const [searchParams] = useSearchParams()
  const searchValue = searchParams.get('name') || ''
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(AppContext)

  const { data: purchasesInCartData } = useQuery({
    queryKey: [QUERY_KEY.PURCHASES, { status: PURCHASES_STATUS.IN_CART }],
    queryFn: () => purchaseService.getPurchases({ status: PURCHASES_STATUS.IN_CART }),
    enabled: isAuthenticated
  })

  const purchasesInCart = purchasesInCartData?.data.data || []

  const { register, handleSubmit } = useForm<SearchFormData>({
    defaultValues: {
      name: searchValue
    },
    resolver: yupResolver(searchSchema)
  })

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setUser(null)
      queryClient.removeQueries({ queryKey: [QUERY_KEY.PURCHASES, { status: PURCHASES_STATUS.IN_CART }] })
    }
  })

  const handleLogout = useCallback(() => {
    logoutMutation.mutate()
  }, [logoutMutation])

  const handleSearch = handleSubmit((data: SearchFormData) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }

    navigate({
      pathname: PATH.HOME,
      search: createSearchParams(config).toString()
    })
  })

  const isPurchasedGoodInCart = purchasesInCart && purchasesInCart.length > 0

  return (
    <header className='pb-5 pt-2 bg-[linear-gradient(-180deg,#f53d2d,#f63)] text-white'>
      <div className='container'>
        <section className='flex justify-end' aria-label='User actions'>
          <h2 className='sr-only'>User Actions</h2>
          <Popover
            className='flex items-center py-1 hover:text-white/70 cursor-pointer mr-6'
            renderPopover={
              <div
                className='bg-white relative shadow-md rounded-sm border border-gray-200'
                role='menu'
                aria-label='Language selection'
              >
                <Button
                  className='w-full text-left not-first:block py-2 pr-28 pl-3 hover:bg-slate-100 bg-white hover:text-cyan-500 text-gray-800'
                  role='menuitem'
                  aria-label='Select Vietnamese language'
                >
                  Tiếng Việt
                </Button>
                <Button
                  className='w-full text-left not-first:block py-2 pr-28 pl-3 hover:bg-slate-100 bg-white hover:text-cyan-500 mt-2 text-gray-800'
                  role='menuitem'
                  aria-label='Select English language'
                >
                  Tiếng Anh
                </Button>
              </div>
            }
          >
            <Earth size={16} aria-hidden='true' />
            <span className='mx-1'>Tiếng Việt</span>
            <ChevronDown size={16} aria-hidden='true' />
          </Popover>
          {isAuthenticated && (
            <Popover
              className='flex items-center py-1 hover:text-white/70 cursor-pointer'
              renderPopover={
                <div
                  className='bg-white relative shadow-md rounded-sm border border-gray-200'
                  role='menu'
                  aria-label='User account menu'
                >
                  <Link
                    to={PATH.PROFILE}
                    className='w-full text-left block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 text-gray-800'
                    role='menuitem'
                    aria-label='View my account'
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link
                    to={PATH.HOME}
                    className='w-full text-left block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 text-gray-800'
                    role='menuitem'
                    aria-label='View my orders'
                  >
                    Đơn mua
                  </Link>
                  <Button
                    className='w-full text-left block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 text-gray-800'
                    role='menuitem'
                    aria-label='Sign out'
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </Button>
                </div>
              }
            >
              <figure className='size-6 mr-2 flex-shrink-0'>
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrZqTCInyg6RfYC7Ape20o-EWP1EN_A8fOA&s'
                  alt='User avatar'
                  width={24}
                  height={24}
                  className='size-full object-cover rounded-full'
                />
              </figure>
              <span>{user?.email}</span>
            </Popover>
          )}
          {!isAuthenticated && (
            <nav className='flex items-center'>
              <Link to={PATH.REGISTER} className='mr-3 capitalize hover:text-white/70'>
                Đăng ký
              </Link>
              <span className='border-r-[1px] border-r-white/40 h-4' />
              <Link to={PATH.LOGIN} className='mx-3 capitalize hover:text-white/70'>
                Đăng nhập
              </Link>
            </nav>
          )}
        </section>
        <section className='grid grid-cols-12 gap-4 mt-4 items-end' aria-label='Main navigation'>
          <h2 className='sr-only'>Main Navigation</h2>
          <nav className='col-span-3 lg:col-span-2' aria-label='Brand and logo'>
            <Link to={PATH.HOME} className='flex items-center gap-2'>
              <Handbag size={30} className='text-white mb-1' aria-hidden='true' />
              <span className='text-base text-white font-semibold'>Shopping Spree</span>
            </Link>
          </nav>
          <section className='col-span-8' aria-label='Search functionality'>
            <h3 className='sr-only'>Product Search</h3>
            <form role='search' aria-label='Search products' onSubmit={handleSearch}>
              <div className='bg-white rounded-sm p-1 flex'>
                <label htmlFor='search-input' className='sr-only'>
                  Search products
                </label>
                <input
                  id='search-input'
                  type='search'
                  className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
                  placeholder='Free Ship đơn từ 0Đ'
                  aria-label='Search for products'
                  {...register('name')}
                />
                <Button
                  type='submit'
                  variant='primary'
                  size='md'
                  className='flex-shrink-0'
                  aria-label='Search products'
                >
                  <Search size={16} className='text-white' aria-hidden='true' />
                </Button>
              </div>
            </form>
          </section>
          <nav className='col-span-1' aria-label='Shopping cart'>
            <Popover
              renderPopover={
                <article
                  className='bg-white relative shadow-md rounded-sm border border-gray-200 w-[400px] text-sm p-4'
                  role='menu'
                  aria-label='Shopping cart menu'
                >
                  {isPurchasedGoodInCart ? (
                    <>
                      <header className='mb-4'>
                        <h3 className='text-gray-400 capitalize text-sm font-medium'>Sản phẩm mới thêm</h3>
                      </header>

                      <section className='space-y-3' aria-label='Product list'>
                        <h4 className='sr-only'>Danh sách sản phẩm</h4>
                        {purchasesInCart.slice(0, MAX_PURCHASES_IN_CART).map((item) => (
                          <article
                            key={item._id}
                            className='flex items-center gap-3 hover:bg-gray-100 rounded p-2 -m-2'
                            role='menuitem'
                          >
                            <h5 className='sr-only'>Sản phẩm {item.product.name}</h5>
                            <figure className='flex-shrink-0'>
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                width={44}
                                height={44}
                                className='size-11 object-cover rounded'
                              />
                            </figure>
                            <section className='flex-grow min-w-0 flex items-center justify-between'>
                              <h6 className='sr-only'>Thông tin sản phẩm</h6>
                              <h4 className='truncate text-gray-800 text-sm flex-1 mr-2 font-normal'>
                                {item.product.name}
                              </h4>
                              <p className='text-orange-600 font-medium text-sm flex-shrink-0'>
                                ₫{formatCurrency(item.product.price)}
                              </p>
                            </section>
                          </article>
                        ))}
                      </section>

                      <footer className='mt-4 pt-3 border-t border-gray-200 flex justify-between items-center'>
                        <p className='text-sm text-gray-600'>
                          {purchasesInCart.length > MAX_PURCHASES_IN_CART
                            ? purchasesInCart.length - MAX_PURCHASES_IN_CART
                            : ''}{' '}
                          Thêm Hàng Vào Giỏ
                        </p>
                        <Link to={PATH.CART} className='cursor-pointer'>
                          <Button variant='primary' size='sm'>
                            Xem Giỏ Hàng
                          </Button>
                        </Link>
                      </footer>
                    </>
                  ) : (
                    <figure className='p-2 flex flex-col items-center justify-center flex-shrink-0'>
                      <img src={noProductImage} alt='No product' width={100} height={100} className='object-cover' />
                      <figcaption className='text-gray-400 text-sm font-medium'>Chưa có sản phẩm</figcaption>
                    </figure>
                  )}
                </article>
              }
            >
              <Link to={PATH.HOME} aria-label='View shopping cart' className='relative'>
                <ShoppingCart size={25} aria-hidden='true' />
                {isPurchasedGoodInCart && (
                  <Badge
                    size='sm'
                    className='absolute -top-2 -right-3 min-w-[20px] h-5 flex items-center justify-center bg-white text-orange-500'
                  >
                    {purchasesInCart.length}
                  </Badge>
                )}
              </Link>
            </Popover>
          </nav>
        </section>
      </div>
    </header>
  )
}

export default Header
