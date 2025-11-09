import { AppContext } from '@/contexts'
import router from '@/router'
import { localStorageEventTarget } from '@/utils'
import { useContext, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

const App = () => {
  const reset = useContext(AppContext).reset

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLocalStorage', reset)
    return () => {
      localStorageEventTarget.removeEventListener('clearLocalStorage', reset)
    }
  }, [reset])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </>
  )
}

export default App
