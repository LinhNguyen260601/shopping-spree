import { Helmet } from '@dr.pogodin/react-helmet'
import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import FormField from '@/components/FormField'
import InputController from '@/components/InputController'
import InputFile from '@/components/InputFile'
import { DateSelect } from '@/pages/User/components'
import { useProfileController } from '@/pages/User/controllers'
import { useTranslation } from 'react-i18next'
import { Controller } from 'react-hook-form'

const Profile = () => {
  const { t } = useTranslation(['user', 'common'])
  const {
    avatar,
    errors,
    isValid,
    control,
    isDirty,
    profile,
    register,
    previewImage,
    isSubmiting,
    onSubmit,
    handleFileChange
  } = useProfileController()

  return (
    <>
      <Helmet>
        <title>Thông Tin Cá Nhân - Shopping Spree | Quản Lý Tài Khoản</title>
        <meta
          name='description'
          content='Quản lý thông tin cá nhân của bạn tại Shopping Spree. Cập nhật hồ sơ, địa chỉ giao hàng, số điện thoại và các thông tin khác để trải nghiệm mua sắm tốt nhất.'
        />
        <meta name='keywords' content='thông tin cá nhân, profile, tài khoản, quản lý hồ sơ, shopping spree' />
        <meta property='og:title' content='Thông Tin Cá Nhân - Shopping Spree' />
        <meta
          property='og:description'
          content='Quản lý thông tin cá nhân của bạn tại Shopping Spree. Cập nhật hồ sơ và địa chỉ giao hàng.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={location.href} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Thông Tin Cá Nhân - Shopping Spree' />
        <meta name='twitter:description' content='Quản lý thông tin cá nhân của bạn tại Shopping Spree.' />
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
        <hgroup className='border-b border-b-gray-200 py-6'>
          <h1 className='text-lg font-medium capitalize text-gray-900'>{t('user:profile.title')}</h1>
          <p className='mt-1 text-sm text-gray-700'>{t('user:profile.subtitle')}</p>
        </hgroup>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
          <section className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <h2 className='sr-only'>{t('user:profile.personalInfo')}</h2>
            <dl className='flex flex-col flex-wrap sm:flex-row'>
              <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('user:profile.email')}</dt>
              <dd className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>{profile.email}</div>
              </dd>
            </dl>
            <dl className='mt-6 flex flex-col flex-wrap sm:flex-row'>
              <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
                <label>{t('user:profile.name')}</label>
              </dt>
              <dd className='sm:w-[80%] sm:pl-5'>
                <FormField
                  className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  name='name'
                  register={register}
                  placeholder={t('user:profile.namePlaceholder')}
                  error={errors.name?.message}
                />
              </dd>
            </dl>
            <dl className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
                <label>{t('user:profile.phone')}</label>
              </dt>
              <dd className='sm:w-[80%] sm:pl-5'>
                <InputController
                  control={control}
                  type='number'
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  name='phone'
                  placeholder={t('user:profile.phonePlaceholder')}
                />
              </dd>
            </dl>
            <dl className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
                <label>{t('user:profile.address')}</label>
              </dt>
              <dd className='sm:w-[80%] sm:pl-5'>
                <FormField
                  className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  name='address'
                  register={register}
                  placeholder={t('user:profile.addressPlaceholder')}
                  error={errors.address?.message}
                />
              </dd>
            </dl>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect errorMsg={errors.date_of_birth?.message} value={field.value} onChange={field.onChange} />
              )}
            />
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <span className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
              <div className='sm:w-[80%] sm:pl-5'>
                <Button
                  type='submit'
                  disabled={!isDirty || !isValid}
                  loading={isSubmiting}
                  loadingText={t('common:loading.updating')}
                >
                  {t('common:actions.save')}
                </Button>
              </div>
            </div>
          </section>
          <section className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
            <h2 className='sr-only'>{t('user:profile.avatar')}</h2>
            <figure className='flex flex-col items-center'>
              <div className='my-5 size-24 cursor-pointer'>
                <Avatar size='xl' src={previewImage || avatar} width={96} height={96} className='size-full' />
              </div>
              <InputFile inputChange={handleFileChange} />
              <figcaption className='mt-3 text-gray-400'>
                <div>{t('user:profile.fileSize')}</div>
                <div>{t('user:profile.fileFormat')}</div>
              </figcaption>
            </figure>
          </section>
        </form>
      </div>
    </>
  )
}

export default Profile
