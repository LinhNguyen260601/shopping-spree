import { AppProvider } from '@/contexts'
import router from '@/router'
import { RouterProvider } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <AppProvider>
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
    </AppProvider>
  )
}

export default App
