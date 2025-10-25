import UserAsideNav from '@/pages/User/components'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
      <UserAsideNav />
      <Outlet />
    </div>
  )
}

export default UserLayout
