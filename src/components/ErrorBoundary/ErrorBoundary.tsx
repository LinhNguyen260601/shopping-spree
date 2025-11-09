import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'

const ErrorBoundary = () => {
  const error = useRouteError()

  let message = 'Đã xảy ra lỗi.'

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) message = 'Không tìm thấy trang.'
    if (error.status === 500) message = 'Lỗi máy chủ nội bộ.'
  }

  return (
    <main className='grid min-h-full place-items-center bg-gradient-to-b from-orange-50 to-neutral-100 px-6 py-24 sm:py-32 lg:px-8'>
      <header className='text-center'>
        <p className='text-9xl font-semibold text-orange-500'>Oops!</p>
        <h1 className='mt-4 text-4xl font-semibold text-gray-800'>{message}</h1>
        <p className='mt-6 text-gray-500'>{error instanceof Error ? error.message : 'Lỗi ứng dụng không mong muốn.'}</p>
        <nav className='mt-10 flex items-center justify-center gap-x-6'>
          <Link
            to='/'
            className='rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500'
          >
            Quay lại trang chủ
          </Link>
        </nav>
      </header>
    </main>
  )
}

export default ErrorBoundary
