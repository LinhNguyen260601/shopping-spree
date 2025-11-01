import { PATH } from '@/constants'
import { Handbag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useMatch } from 'react-router-dom'

const Navbar = () => {
  const { t } = useTranslation(['header', 'login', 'register'])
  const registerMatch = useMatch(PATH.REGISTER)
  const isRegister = !!registerMatch

  return (
    <header className='py-5'>
      <div className='container'>
        <nav className='flex items-center gap-3'>
          <Link to={PATH.HOME} className='flex items-center gap-1'>
            <Handbag size={30} className='text-red-700 mb-1' />
            <span className='text-base text-red-700 font-semibold'>Shopping Spree</span>
          </Link>
          <span className='text-xl lg:text-2xl'>{isRegister ? t('register:title') : t('login:title')}</span>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
