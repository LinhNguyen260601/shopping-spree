import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import Popover from '@/components/Popover'
import { PATH, PURCHASES_STATUS, QUERY_KEY } from '@/constants'
import { AppContext } from '@/contexts'
import { useStatusLink } from '@/hooks'
import { locales } from '@/i18n/i18n'
import { authService } from '@/services'
import { clearLocalStorage, saveLanguageToLocalStorage } from '@/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChevronDown, Earth } from 'lucide-react'
import { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const NavHeader = () => {
  const getStatusLink = useStatusLink().getStatusLink
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(AppContext)
  const queryClient = useQueryClient()
  const { i18n, t } = useTranslation(['header', 'common'])
  const currentLanguage = locales[i18n.language as keyof typeof locales] || locales.vi

  const historyPurchaseLinkTo = getStatusLink(PATH.HISTORY_PURCHASE)

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setUser(null)
      queryClient.removeQueries({ queryKey: [QUERY_KEY.PURCHASES, { status: PURCHASES_STATUS.IN_CART }] })
      clearLocalStorage()
    }
  })

  const handleLogout = useCallback(() => {
    import('@/layouts/RegisterLayout')
    import('@/pages/Login')
    logoutMutation.mutate()
  }, [logoutMutation])

  const handlePreloadRegisterLayout = (isRegister: boolean) => () => {
    import('@/layouts/RegisterLayout')
    !isRegister ? import('@/pages/Login') : import('@/pages/Register')
  }

  const handlePreloadUserLayout = (type: 'profile' | 'history-purchase') => () => {
    import('@/pages/User/layouts/UserLayout')
    type === 'profile' ? import('@/pages/User/pages/Profile') : import('@/pages/User/pages/HistoryPurchase')
  }

  const handleChangeLanguage = (language: 'en' | 'vi') => () => {
    i18n.changeLanguage(language)
    saveLanguageToLocalStorage(language)
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
              onClick={handleChangeLanguage('vi')}
            >
              {t('header:language.vietnamese')}
            </Button>
            <Button
              className='w-full text-left not-first:block py-2 pr-28 pl-3 hover:bg-slate-100 bg-white hover:text-cyan-500 mt-2 text-gray-800'
              role='menuitem'
              aria-label='Select English language'
              onClick={handleChangeLanguage('en')}
            >
              {t('header:language.english')}
            </Button>
          </div>
        }
      >
        <Earth size={20} aria-hidden='true' />
        <span className='mx-1'>{currentLanguage}</span>
        <ChevronDown size={20} aria-hidden='true' />
      </Popover>
      {isAuthenticated && (
        <Popover
          className='flex py-1 hover:text-white/70 cursor-pointer'
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
                onMouseEnter={handlePreloadUserLayout('profile')}
              >
                {t('header:nav.myAccount')}
              </Link>
              <Link
                to={historyPurchaseLinkTo}
                className='w-full text-left block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 text-gray-800'
                role='menuitem'
                aria-label='View my orders'
                onMouseEnter={handlePreloadUserLayout('history-purchase')}
              >
                {t('header:nav.purchaseOrders')}
              </Link>
              <Button
                className='w-full text-left block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 text-gray-800'
                role='menuitem'
                aria-label='Sign out'
                onClick={handleLogout}
              >
                {t('header:nav.logout')}
              </Button>
            </div>
          }
        >
          <figure className='size-6 mr-2 flex-shrink-0'>
            <Avatar width={24} height={24} src={user?.avatar} className='size-full' />
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
            {t('header:nav.register')}
          </Link>
          <span className='border-r-[1px] border-r-white/40 h-4' />
          <Link
            to={PATH.LOGIN}
            className='mx-3 capitalize hover:text-white/70'
            onMouseEnter={handlePreloadRegisterLayout(false)}
          >
            {t('header:nav.login')}
          </Link>
        </nav>
      )}
    </section>
  )
}

export default NavHeader
