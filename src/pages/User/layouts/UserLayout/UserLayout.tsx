import { UserAsideNav } from '@/pages/User/components'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <main className='bg-neutral-100 py-16 text-sm text-gray-600'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserAsideNav />
          </div>
          <div className='md:col-span-9 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserLayout
