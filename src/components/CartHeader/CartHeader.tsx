import Button from '@/components/Button'
import NavHeader from '@/components/NavHeader'
import { PATH } from '@/constants'
import { useSearchProducts } from '@/hooks'
import { Handbag, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const CartHeader = () => {
  const { register, handleSearch } = useSearchProducts()

  return (
    <header className='border-b border-b-black/10'>
      <div className='bg-orange-500 text-white'>
        <div className='container'>
          <NavHeader />
        </div>
      </div>
      <div className='bg-white py-6'>
        <div className='container'>
          <nav className='md:flex md:items-center md:justify-between gap-3'>
            <Link to={PATH.HOME} className='flex flex-shrink-0 items-center'>
              <div className='flex items-center gap-1'>
                <Handbag size={30} className='text-orange-500 mb-1' />
                <span className='text-base text-orange-500 font-semibold'>Shopping Spree</span>
              </div>
              <span className='mx-4 h-6 md:h-8 w-[1px] bg-orange-500' />
              <span className='capitalize text-orange-500 lg:text-xl'>Giỏ hàng</span>
            </Link>
            <form
              className='mt-3 md:mt-0 md:w-[50%]'
              role='search'
              aria-label='Search products'
              onSubmit={handleSearch}
            >
              <div className='rounded-sm flex border-2 border-orange-500'>
                <label htmlFor='search-input' className='sr-only'>
                  Search products
                </label>
                <input
                  id='search-input'
                  type='search'
                  className='w-full flex-grow border-none bg-transparent px-3 py-1 text-black outline-none'
                  placeholder='Free Ship đơn từ 0Đ'
                  aria-label='Search for products'
                  {...register('name')}
                />
                <Button
                  type='submit'
                  variant='primary'
                  size='md'
                  className='flex-shrink-0 rounded-none py-2 px-8'
                  aria-label='Search products'
                >
                  <Search size={16} className='text-white' aria-hidden='true' />
                </Button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default CartHeader
