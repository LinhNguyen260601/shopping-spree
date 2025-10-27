import Avatar from '@/components/Avatar'
import { PATH } from '@/constants'
import { AppContext } from '@/contexts'
import type { User as UserType } from '@/types'
import { LockKeyhole, Pencil, ReceiptText, User } from 'lucide-react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const UserAsideNav = () => {
  const { avatar = '', email = '' } = useContext(AppContext).user as UserType

  return (
    <>
      <nav className='flex flex-col border-b border-b-gray-200 py-4'>
        <figure className='flex items-center'>
          <Link to={PATH.PROFILE} className='size-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
            <Avatar width={48} height={48} src={avatar} />
          </Link>
          <figcaption className='flex-grow pl-4'>
            <div className='mb-1 truncate font-semibold text-gray-600'>{email}</div>
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
