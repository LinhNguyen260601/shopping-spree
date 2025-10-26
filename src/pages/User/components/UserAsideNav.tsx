import { PATH } from '@/constants'
import { LockKeyhole, Pencil, ReceiptText, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const UserAsideNav = () => {
  return (
    <>
      <nav className='flex flex-col border-b border-b-gray-200 py-4'>
        <figure className='flex items-center'>
          <Link to={PATH.PROFILE} className='size-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrZqTCInyg6RfYC7Ape20o-EWP1EN_A8fOA&s'
              alt='User avatar'
              width={48}
              height={48}
              className='size-full object-cover rounded-full'
            />
          </Link>
          <figcaption className='flex-grow pl-4'>
            <div className='mb-1 truncate font-semibold text-gray-600'>Key</div>
            <Link to={PATH.PROFILE} className='flex items-center capitalize text-gray-500 gap-1'>
              <Pencil size={12} className='text-[#9b9b9b] fill-[#9b9b9b]' />
              Sửa hồ sơ
            </Link>
          </figcaption>
        </figure>
      </nav>
      <section className='mt-7'>
        <h2 className='sr-only'>User Navigation</h2>
        <ul>
          <li>
            <Link to={PATH.PROFILE} className='flex items-center capitalize text-orange-500 transition-colors gap-3'>
              <User size={20} className='text-blue-500 ' />
              Tài khoản của tôi
            </Link>
          </li>
          <li className='mt-4'>
            <Link
              to={PATH.CHANGE_PASSWORD}
              className='flex items-center capitalize text-gray-600 transition-colors gap-3'
            >
              <LockKeyhole size={20} className='text-blue-500 ' />
              Đổi mật khẩu
            </Link>
          </li>
          <li className='mt-4'>
            <Link
              to={PATH.HISTORY_PURCHASE}
              className='flex items-center capitalize text-gray-600 transition-colors gap-3'
            >
              <ReceiptText size={20} className='text-blue-500 ' />
              Đơn mua
            </Link>
          </li>
        </ul>
      </section>
    </>
  )
}

export default UserAsideNav
