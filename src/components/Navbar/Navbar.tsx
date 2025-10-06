import { PATH } from '@/constants'
import { Handbag } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const pathname = useLocation().pathname
  const isRegister = pathname === PATH.REGISTER

  return (
    <header className='py-5'>
      <div className='container'>
        <nav className='flex items-center gap-3'>
          <Link to={PATH.HOME} className='flex items-center gap-1'>
            <Handbag size={30} className='text-red-700 mb-1' />
            <span className='text-base text-red-700 font-semibold'>Shopping Spree</span>
          </Link>
          <span className='text-xl lg:text-2xl'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</span>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
