import Input from '@/components/Input'

const Profile = () => {
  return (
    <main className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <hgroup className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <p className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </hgroup>
      <div className='mt-8 flex flex-col-reverse md:flex-row'>
        <section className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <h2 className='sr-only'>Thông tin cá nhân</h2>
          <form>
            <dl className='flex flex-col flex-wrap sm:flex-row'>
              <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</dt>
              <dd className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>du***********@gmail.com</div>
              </dd>
            </dl>
            <dl className='mt-6 flex flex-col flex-wrap sm:flex-row'>
              <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
                <label htmlFor='name'>Tên</label>
              </dt>
              <dd className='sm:w-[80%] sm:pl-5'>
                <Input
                  id='name'
                  className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                />
              </dd>
            </dl>
            <dl className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
                <label htmlFor='phone'>Số điện thoại</label>
              </dt>
              <dd className='sm:w-[80%] sm:pl-5'>
                <Input
                  id='phone'
                  className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                />
              </dd>
            </dl>
            <dl className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <dt className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
                <label htmlFor='address'>Địa chỉ</label>
              </dt>
              <dd className='sm:w-[80%] sm:pl-5'>
                <Input
                  id='address'
                  className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                />
              </dd>
            </dl>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='flex justify-between'>
                  <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                    <option disabled>Ngày</option>
                  </select>
                  <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                    <option disabled>Tháng</option>
                  </select>
                  <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                    <option disabled>Năm</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </section>
        <section className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <h2 className='sr-only'>Ảnh đại diện</h2>
          <figure className='flex flex-col items-center'>
            <div className='my-5 size-24 cursor-pointer'>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrZqTCInyg6RfYC7Ape20o-EWP1EN_A8fOA&s'
                alt='User avatar'
                width={96}
                height={96}
                className='size-full object-cover rounded-full'
              />
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' aria-label='Tải ảnh đại diện lên' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm cursor-pointer'>
              Chọn ảnh
            </button>
            <figcaption className='mt-3 text-gray-400'>
              <div>Dung lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </figcaption>
          </figure>
        </section>
      </div>
    </main>
  )
}

export default Profile
