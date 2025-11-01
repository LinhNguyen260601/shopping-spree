import Button from '@/components/Button'
import FormField from '@/components/FormField'
import { PATH } from '@/constants'
import useRegisterController from '@/pages/Register/controllers'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Register = () => {
  const { t } = useTranslation(['register', 'common'])
  const { register, formState, onSubmit, isSubmitting, handlePreloadRegisterLayout } = useRegisterController()

  const { errors, isValid, isDirty } = formState

  return (
    <main className='bg-flamingo min-h-screen'>
      <div className='container'>
        <section className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <h2 className='sr-only'>Form đăng ký</h2>
          <article className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' role='form' aria-label='Đăng nhập' onSubmit={onSubmit}>
              {/* Header */}
              <header className='mb-8'>
                <h1 className='text-2xl font-semibold text-gray-800'>{t('register:title')}</h1>
                <p className='mt-2 text-sm text-gray-600'>{t('register:subtitle')}</p>
              </header>

              {/* Form */}
              <fieldset className='space-y-1'>
                <FormField
                  name='email'
                  label={t('register:email')}
                  type='email'
                  placeholder={t('register:emailPlaceholder')}
                  required
                  error={errors.email?.message}
                  register={register}
                  autoFocus
                />
                <FormField
                  name='password'
                  label={t('register:password')}
                  type='password'
                  placeholder={t('register:passwordPlaceholder')}
                  required
                  showPasswordToggle
                  error={errors.password?.message}
                  register={register}
                  autoComplete='on'
                />
                <FormField
                  name='passwordConfirm'
                  label={t('register:confirmPassword')}
                  type='password'
                  placeholder={t('register:confirmPasswordPlaceholder')}
                  required
                  showPasswordToggle
                  error={errors.passwordConfirm?.message}
                  register={register}
                  autoComplete='on'
                />
              </fieldset>

              {/* Button */}
              <div className='mt-2'>
                <Button
                  type='submit'
                  loading={isSubmitting}
                  loadingText={t('common:loading.registering')}
                  variant='danger'
                  size='lg'
                  fullWidth
                  className='uppercase'
                  disabled={!isValid || !isDirty}
                  aria-describedby='submit-help'
                >
                  {t('register:submit')}
                </Button>
              </div>

              {/* Link */}
              <nav className='mt-8 text-center'>
                <span className='text-gray-600'>{t('register:hasAccount')} </span>
                <Link
                  to={PATH.LOGIN}
                  className='text-red-600 font-medium hover:text-red-700'
                  onMouseEnter={handlePreloadRegisterLayout}
                >
                  {t('register:loginLink')}
                </Link>
              </nav>
            </form>
          </article>
        </section>
      </div>
    </main>
  )
}

export default Register
