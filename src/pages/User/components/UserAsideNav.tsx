import Avatar from '@/components/Avatar'
import { PATH } from '@/constants'
import { AppContext } from '@/contexts'
import { ASIDE_NAV_ITEMS } from '@/pages/User/core'
import type { User as UserType } from '@/types'
import { cn } from '@/utils'
import { Pencil } from 'lucide-react'
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'

const UserAsideNav = () => {
  const { avatar = '', email = '' } = useContext(AppContext).user as UserType

  return (
    <>
      <nav className='flex flex-col border-b border-b-gray-200 py-4'>
        <figure className='flex items-center'>
          <Link to={PATH.PROFILE} className='size-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
            <Avatar src={avatar} width={48} height={48} />
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
          {ASIDE_NAV_ITEMS.map((item) => (
            <li className='not-first:mt-4' key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center capitalize gap-3 transition-colors hover:text-orange-500',
                    isActive ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
                  )
                }
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default UserAsideNav
