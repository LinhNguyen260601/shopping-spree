import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import FormField from '@/components/FormField'
import InputController from '@/components/InputController'
import InputFile from '@/components/InputFile'
import { DateSelect } from '@/pages/User/components'
import { useProfileController } from '@/pages/User/controllers'
import { Controller } from 'react-hook-form'

const Profile = () => {
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
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <hgroup className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <p className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </hgroup>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <section className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <h2 className='sr-only'>Thông tin cá nhân</h2>
          <dl className='flex flex-col flex-wrap sm:flex-row'>
            <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</dt>
            <dd className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile.email}</div>
            </dd>
          </dl>
          <dl className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              <label>Tên</label>
            </dt>
            <dd className='sm:w-[80%] sm:pl-5'>
              <FormField
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='name'
                register={register}
                placeholder='Tên'
                error={errors.name?.message}
              />
            </dd>
          </dl>
          <dl className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              <label>Số điện thoại</label>
            </dt>
            <dd className='sm:w-[80%] sm:pl-5'>
              <InputController
                control={control}
                type='number'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='phone'
                placeholder='Số điện thoại'
              />
            </dd>
          </dl>
          <dl className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              <label>Địa chỉ</label>
            </dt>
            <dd className='sm:w-[80%] sm:pl-5'>
              <FormField
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='address'
                register={register}
                placeholder='Địa chỉ'
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
                loadingText='Đang cập nhật...'
              >
                Lưu
              </Button>
            </div>
          </div>
        </section>
        <section className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <h2 className='sr-only'>Ảnh đại diện</h2>
          <figure className='flex flex-col items-center'>
            <div className='my-5 size-24 cursor-pointer'>
              <Avatar size='xl' src={previewImage || avatar} width={96} height={96} />
            </div>
            <InputFile onChange={handleFileChange} />
            <figcaption className='mt-3 text-gray-400'>
              <div>Dung lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </figcaption>
          </figure>
        </section>
      </form>
    </div>
  )
}

export default Profile
