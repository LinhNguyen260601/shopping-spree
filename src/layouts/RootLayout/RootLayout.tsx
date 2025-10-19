import { useEffect, useRef } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar'

const RootLayout = () => {
  const ref = useRef<LoadingBarRef>(null)
  const navigation = useNavigation()

  useEffect(() => {
    if (navigation.state === 'loading') {
      ref.current?.continuousStart()
      return
    }

    ref.current?.complete()
  }, [navigation.state, ref])

  return (
    <>
      <LoadingBar ref={ref} color='oklch(64.6% 0.222 41.116)' shadow className='z-50' />
      <Outlet />
    </>
  )
}

export default RootLayout
