import { PATH } from '@/constants'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='py-5'>
      <div className='max-w-7wl mx-auto px-4'>
        <nav className='flex items-end'>
          <Link to={PATH.HOME} className='flex items-center gap-1 size-8 lg:h-11 w-24 lg:w-28'>
            <img
              src='/public/logo.webp'
              alt='Shopping Spree Logo'
              width='100%'
              height='100%'
              className='object-cover'
            />
          </Link>
          <Link to={PATH.REGISTER} className='text-xl lg:text-2xl'>
            Đăng ký
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
