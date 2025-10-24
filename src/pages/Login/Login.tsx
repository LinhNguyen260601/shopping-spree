import Button from '@/components/Button'
import FormField from '@/components/FormField'
import { PATH } from '@/constants'
import useLoginController from '@/pages/Login/controllers'
import { Link } from 'react-router-dom'

const Login = () => {
  const { register, formState, onSubmit, isSubmitting, handlePreloadRegisterLayout } = useLoginController()

  const { errors, isValid, isDirty } = formState

  return (
    <main className='bg-flamingo min-h-screen'>
      <div className='container'>
        <section className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <h2 className='sr-only'>Form đăng nhập</h2>
          <article className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' role='form' aria-label='Đăng nhập' onSubmit={onSubmit}>
              {/* Header */}
              <header className='mb-8'>
                <h1 className='text-2xl font-semibold text-gray-800'>Đăng nhập</h1>
                <p className='mt-2 text-sm text-gray-600'>Vui lòng nhập thông tin đăng nhập của bạn</p>
              </header>

              {/* Form */}
              <fieldset className='space-y-2'>
                <FormField
                  name='email'
                  label='Email'
                  type='email'
                  placeholder='Nhập email của bạn'
                  required
                  error={errors.email?.message}
                  register={register}
                  autoFocus
                />
                <FormField
                  name='password'
                  label='Mật khẩu'
                  type='password'
                  placeholder='Nhập mật khẩu của bạn'
                  required
                  showPasswordToggle
                  error={errors.password?.message}
                  register={register}
                  autoComplete='on'
                />
              </fieldset>
              {/* Button */}
              <div className='mt-3'>
                <Button
                  type='submit'
                  loading={isSubmitting}
                  loadingText='Đang đăng nhập...'
                  variant='danger'
                  size='lg'
                  fullWidth
                  className='uppercase'
                  aria-describedby='submit-help'
                  disabled={!isValid || !isDirty}
                >
                  Đăng nhập
                </Button>
              </div>
              {/* Link */}
              <nav className='mt-8 text-center'>
                <span className='text-gray-600'>Bạn chưa có tài khoản? </span>
                <Link
                  to={PATH.REGISTER}
                  className='text-red-600 font-medium hover:text-red-700'
                  onMouseEnter={handlePreloadRegisterLayout}
                >
                  Đăng ký
                </Link>
              </nav>
            </form>
          </article>
        </section>
      </div>
    </main>
  )
}

export default Login
