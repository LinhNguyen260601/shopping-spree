import { PATH } from '@/constants'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <main className='bg-flamingo min-h-screen'>
      <div className='max-w-7xl mx-auto px-4'>
        <section className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <h2 className='sr-only'>Form đăng nhập</h2>
          <article className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' role='form' aria-label='Đăng nhập'>
              {/* Header */}
              <header className='mb-8'>
                <h1 className='text-2xl font-semibold text-gray-800'>Đăng nhập</h1>
                <p className='mt-2 text-sm text-gray-600'>Vui lòng nhập thông tin đăng nhập của bạn</p>
              </header>

              {/* Form */}
              <fieldset className='space-y-2'>
                <div className='form-group'>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                    Email
                  </label>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    required
                    aria-describedby='email-error'
                    className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm transition-colors'
                    placeholder='Nhập email của bạn'
                  />
                  <div
                    id='email-error'
                    className='mt-1 text-red-600 min-h-[1rem] text-sm'
                    role='alert'
                    aria-live='polite'
                  ></div>
                </div>

                <div className='form-group'>
                  <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                    Mật khẩu
                  </label>
                  <input
                    id='password'
                    type='password'
                    name='password'
                    required
                    aria-describedby='password-error'
                    className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm transition-colors'
                    placeholder='Nhập mật khẩu của bạn'
                  />
                  <div
                    id='password-error'
                    className='mt-1 text-red-600 min-h-[1rem] text-sm'
                    role='alert'
                    aria-live='polite'
                  ></div>
                </div>
              </fieldset>
              {/* Button */}
              <div className='mt-3'>
                <button
                  type='submit'
                  className='cursor-pointer w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors'
                  aria-describedby='submit-help'
                >
                  Đăng nhập
                </button>
              </div>
              {/* Link */}
              <p className='mt-8 text-center'>
                <span className='text-slate-400'>Bạn chưa có tài khoản? </span>
                <Link to={PATH.REGISTER} className='text-red-500'>
                  Đăng ký
                </Link>
              </p>
            </form>
          </article>
        </section>
      </div>
    </main>
  )
}

export default Login
