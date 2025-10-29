import Button from '@/components/Button'
import FormField from '@/components/FormField'
import { useChangePasswordController } from '@/pages/User/pages/ChangePassword/controllers'

const ChangePassword = () => {
  const { errors, isValid, isDirty, register, isSubmitting, onSubmit } = useChangePasswordController()

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <hgroup className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <p className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </hgroup>
      <form className='mt-8 mr-auto max-w-2xl' onSubmit={onSubmit}>
        <section className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <h2 className='sr-only'>Đổi mật khẩu</h2>
          <dl className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              <label>Mật khẩu cũ</label>
            </dt>
            <dd className='sm:w-[80%] sm:pl-5'>
              <FormField
                inputProps={{
                  showPasswordToggle: true,
                  type: 'password',
                  inputClass:
                    'w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                }}
                name='password'
                placeholder='Mật khẩu cũ'
                error={errors.password?.message}
                register={register}
                required
              />
            </dd>
          </dl>
          <dl className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              <label>Mật khẩu mới</label>
            </dt>
            <dd className='sm:w-[80%] sm:pl-5'>
              <FormField
                inputProps={{
                  showPasswordToggle: true,
                  type: 'password',
                  inputClass:
                    'w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                }}
                name='new_password'
                placeholder='Mật khẩu mới'
                error={errors.new_password?.message}
                register={register}
                required
              />
            </dd>
          </dl>
          <dl className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              <label>Nhập mật khẩu mới</label>
            </dt>
            <dd className='sm:w-[80%] sm:pl-5'>
              <FormField
                inputProps={{
                  showPasswordToggle: true,
                  type: 'password',
                  inputClass:
                    'w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                }}
                name='confirm_password'
                placeholder='Nhập mật khẩu mới'
                error={errors.confirm_password?.message}
                register={register}
                required
              />
            </dd>
          </dl>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <span className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                type='submit'
                disabled={!isDirty || !isValid}
                loading={isSubmitting}
                loadingText='Đang cập nhật...'
              >
                Lưu
              </Button>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}

export default ChangePassword
