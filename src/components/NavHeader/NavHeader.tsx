import Button from '@/components/Button'
import Popover from '@/components/Popover'
import { PATH, PURCHASES_STATUS, QUERY_KEY } from '@/constants'
import { AppContext } from '@/contexts'
import { authService } from '@/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChevronDown, Earth } from 'lucide-react'
import { useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'

const NavHeader = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(AppContext)
  const queryClient = useQueryClient()

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

  const handlePreloadRegisterLayout = (isRegister: boolean) => () => {
    import('@/layouts/RegisterLayout')
    !isRegister ? import('@/pages/Login') : import('@/pages/Register')
  }

  return (
    <section className='flex justify-end items-center' aria-label='User actions'>
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
        <nav className='flex items-center min-h-8'>
          <Link
            to={PATH.REGISTER}
            className='mr-3 capitalize hover:text-white/70'
            onMouseEnter={handlePreloadRegisterLayout(true)}
          >
            Đăng ký
          </Link>
          <span className='border-r-[1px] border-r-white/40 h-4' />
          <Link
            to={PATH.LOGIN}
            className='mx-3 capitalize hover:text-white/70'
            onMouseEnter={handlePreloadRegisterLayout(false)}
          >
            Đăng nhập
          </Link>
        </nav>
      )}
    </section>
  )
}

export default NavHeader
