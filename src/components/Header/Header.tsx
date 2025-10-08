import Button from '@/components/Button'
import Popover from '@/components/Popover'
import { PATH } from '@/constants'
import { ChevronDown, Earth, Handbag, Search, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='pb-5 pt-2 bg-[linear-gradient(-180deg,#f53d2d,#f63)] text-white'>
      <div className='container'>
        <section className='flex justify-end' aria-label='User actions'>
          <h2 className='sr-only'>User Actions</h2>
          <Popover
            className='flex items-center py-1 hover:text-gray-300 cursor-pointer mr-6'
            renderPopover={
              <div
                className='bg-white relative shadow-md rounded-sm border border-gray-200'
                role='menu'
                aria-label='Language selection'
              >
                <Button
                  className='w-full text-left not-first:block py-2 pr-28 pl-3 hover:bg-slate-100 bg-white hover:text-cyan-500 text-gray-800'
                  role='menuitem'
                  aria-label='Select Vietnamese language'
                >
                  Tiếng Việt
                </Button>
                <Button
                  className='w-full text-left not-first:block py-2 pr-28 pl-3 hover:bg-slate-100 bg-white hover:text-cyan-500 mt-2 text-gray-800'
                  role='menuitem'
                  aria-label='Select English language'
                >
                  Tiếng Anh
                </Button>
              </div>
            }
          >
            <Earth size={16} aria-hidden='true' />
            <span className='mx-1'>Tiếng Việt</span>
            <ChevronDown size={16} aria-hidden='true' />
          </Popover>
          <Popover
            className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
            renderPopover={
              <div
                className='bg-white relative shadow-md rounded-sm border border-gray-200'
                role='menu'
                aria-label='User account menu'
              >
                <Link
                  to={PATH.HOME}
                  className='w-full text-left not-first:block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 text-gray-800'
                  role='menuitem'
                  aria-label='View my account'
                >
                  Tài khoản của tôi
                </Link>
                <Link
                  to={PATH.HOME}
                  className='w-full text-left block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 text-gray-800'
                  role='menuitem'
                  aria-label='View my orders'
                >
                  Đơn mua
                </Link>
                <Button
                  className='w-full text-left block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 text-gray-800'
                  role='menuitem'
                  aria-label='Sign out'
                >
                  Đăng xuất
                </Button>
              </div>
            }
          >
            <figure className='size-6 mr-2 flex-shrink-0'>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrZqTCInyg6RfYC7Ape20o-EWP1EN_A8fOA&s'
                alt='User avatar'
                width={24}
                height={24}
                className='size-full object-cover rounded-full'
              />
            </figure>
            <span>Key</span>
          </Popover>
        </section>
        <section className='grid grid-cols-12 gap-4 mt-4 items-end' aria-label='Main navigation'>
          <h2 className='sr-only'>Main Navigation</h2>
          <nav className='col-span-3 lg:col-span-2' aria-label='Brand and logo'>
            <Link to={PATH.HOME} className='flex items-center gap-2'>
              <Handbag size={30} className='text-white mb-1' aria-hidden='true' />
              <span className='text-base text-white font-semibold'>Shopping Spree</span>
            </Link>
          </nav>
          <section className='col-span-8' aria-label='Search functionality'>
            <h3 className='sr-only'>Product Search</h3>
            <form role='search' aria-label='Search products'>
              <div className='bg-white rounded-sm p-1 flex'>
                <label htmlFor='search-input' className='sr-only'>
                  Search products
                </label>
                <input
                  id='search-input'
                  name='search'
                  type='search'
                  className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
                  placeholder='Free Ship đơn từ 0Đ'
                  aria-label='Search for products'
                />
                <Button
                  type='submit'
                  className='rounded-sm py-2 px-6 flex-shrink-0 bg-orange-600 hover:opacity-90'
                  aria-label='Search products'
                >
                  <Search size={16} className='text-white' aria-hidden='true' />
                </Button>
              </div>
            </form>
          </section>
          <nav className='col-span-1' aria-label='Shopping cart'>
            <Popover
              initialOpen
              renderPopover={
                <article
                  className='bg-white relative shadow-md rounded-sm border border-gray-200 w-[400px] text-sm p-4'
                  role='menu'
                  aria-label='Shopping cart menu'
                >
                  <header className='mb-4'>
                    <h3 className='text-gray-400 capitalize text-sm font-medium'>Sản phẩm mới thêm</h3>
                  </header>

                  <section className='space-y-3' aria-label='Product list'>
                    <h4 className='sr-only'>Danh sách sản phẩm</h4>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <article key={item} className='flex items-center gap-3' role='menuitem'>
                        <h5 className='sr-only'>Sản phẩm {item}</h5>
                        <figure className='flex-shrink-0'>
                          <img
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrZqTCInyg6RfYC7Ape20o-EWP1EN_A8fOA&s'
                            alt='Ảnh sản phẩm'
                            width={44}
                            height={44}
                            className='size-11 object-cover rounded'
                          />
                        </figure>
                        <section className='flex-grow min-w-0 flex items-center justify-between'>
                          <h6 className='sr-only'>Thông tin sản phẩm</h6>
                          <h4 className='truncate text-gray-800 text-sm flex-1 mr-2 font-normal'>
                            Điện thoại Samsung Galaxy A23 128GB - Màu xanh lá (8GB RAM)
                          </h4>
                          <p className='text-orange-600 font-medium text-sm flex-shrink-0'>₫469.000</p>
                        </section>
                      </article>
                    ))}
                  </section>

                  <footer className='mt-4 pt-3 border-t border-gray-200 flex justify-between items-center'>
                    <p className='text-sm text-gray-600'>1 Thêm Hàng Vào Giỏ</p>
                    <Button className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium'>
                      Xem Giỏ Hàng
                    </Button>
                  </footer>
                </article>
              }
            >
              <Link to={PATH.HOME} aria-label='View shopping cart'>
                <ShoppingCart size={25} aria-hidden='true' />
              </Link>
            </Popover>
          </nav>
        </section>
      </div>
    </header>
  )
}

export default Header
