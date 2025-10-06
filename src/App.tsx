import useRouteElements from '@/useRouteElements'
import { Bounce, ToastContainer } from 'react-toastify'

const App = () => {
  const routeElements = useRouteElements()

  return (
    <>
      {routeElements}
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
