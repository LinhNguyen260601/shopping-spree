import { Helmet } from '@dr.pogodin/react-helmet'
import Button from '@/components/Button'
import FormField from '@/components/FormField'
import { useChangePasswordController } from '@/pages/User/pages/ChangePassword/controllers'
import { useTranslation } from 'react-i18next'

const ChangePassword = () => {
  const { t } = useTranslation(['user', 'common'])
  const { errors, isValid, isDirty, register, isSubmitting, onSubmit   } = useChangePasswordController()

  return (
    <>
      <Helmet>
        <title>Đổi Mật Khẩu - Shopping Spree | Bảo Mật Tài Khoản</title>
        <meta
          name='description'
          content='Đổi mật khẩu tài khoản Shopping Spree của bạn để đảm bảo an toàn và bảo mật. Cập nhật mật khẩu mới một cách dễ dàng và nhanh chóng.'
        />
        <meta name='keywords' content='đổi mật khẩu, change password, bảo mật tài khoản, shopping spree, security' />
        <meta property='og:title' content='Đổi Mật Khẩu - Shopping Spree' />
        <meta
          property='og:description'
          content='Đổi mật khẩu tài khoản Shopping Spree của bạn để đảm bảo an toàn và bảo mật.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={window.location.href} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Đổi Mật Khẩu - Shopping Spree' />
        <meta name='twitter:description' content='Đổi mật khẩu tài khoản Shopping Spree của bạn để đảm bảo an toàn và bảo mật.' />
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <hgroup className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>{t('user:changePassword.title')}</h1>
        <p className='mt-1 text-sm text-gray-700'>{t('user:changePassword.subtitle')}</p>
      </hgroup>
      <form className='mt-8 mr-auto max-w-2xl' onSubmit={onSubmit}>
        <section className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <h2 className='sr-only'>{t('user:changePassword.title')}</h2>
          <dl className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <dt className='truncate pt-3 capitalize sm:w-[30%] sm:text-right'>
              <label>{t('user:changePassword.oldPassword')}</label>
            </dt>
            <dd className='sm:w-[70%] sm:pl-5'>
              <FormField
                inputProps={{
                  showPasswordToggle: true,
                  type: 'password',
                  inputClass:
                    'w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                }}
                name='password'
                placeholder={t('user:changePassword.oldPasswordPlaceholder')}
                error={errors.password?.message}
                register={register}
                required
              />
            </dd>
          </dl>
          <dl className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <dt className='truncate pt-3 capitalize sm:w-[30%] sm:text-right'>
              <label>{t('user:changePassword.newPassword')}</label>
            </dt>
            <dd className='sm:w-[70%] sm:pl-5'>
              <FormField
                inputProps={{
                  showPasswordToggle: true,
                  type: 'password',
                  inputClass:
                    'w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                }}
                name='new_password'
                placeholder={t('user:changePassword.newPasswordPlaceholder')}
                error={errors.new_password?.message}
                register={register}
                required
              />
            </dd>
          </dl>
          <dl className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <dt className='truncate pt-3 capitalize sm:w-[30%] sm:text-right'>
              <label>{t('user:changePassword.confirmPassword')}</label>
            </dt>
            <dd className='sm:w-[70%] sm:pl-5'>
              <FormField
                inputProps={{
                  showPasswordToggle: true,
                  type: 'password',
                  inputClass:
                    'w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                }}
                name='confirm_password'
                placeholder={t('user:changePassword.confirmPasswordPlaceholder')}
                error={errors.confirm_password?.message}
                register={register}
                required
              />
            </dd>
          </dl>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <span className='truncate pt-3 capitalize sm:w-[30%] sm:text-right' />
            <div className='sm:w-[70%] sm:pl-5'>
              <Button
                type='submit'
                disabled={!isDirty || !isValid}
                loading={isSubmitting}
                loadingText={t('common:loading.updating')}
              >
                {t('common:actions.save')}
              </Button>
            </div>
          </div>
        </section>
      </form>
    </div>
    </>
  )
}

export default ChangePassword
