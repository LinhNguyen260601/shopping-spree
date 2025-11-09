import { PURCHASES_STATUS } from '@/constants'
import { useLocation } from 'react-router-dom'

const useStatusLink = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const currentStatus = Number(searchParams.get('status')) || PURCHASES_STATUS.ALL

  const getStatusLink = (basePath: string) => {
    const targetStatus = currentStatus === PURCHASES_STATUS.ALL ? PURCHASES_STATUS.ALL : currentStatus

    return `${basePath}?status=${targetStatus}`
  }

  return { currentStatus, getStatusLink }
}

export default useStatusLink
