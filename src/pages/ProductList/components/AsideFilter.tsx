import Button from '@/components/Button'
import FormField from '@/components/FormField'
import { PATH } from '@/constants'
import { Funnel, Logs, Star, StepForward } from 'lucide-react'
import { Link } from 'react-router-dom'

const AsideFilter = () => {
  return (
    <aside className='py-4' role='complementary' aria-label='Bộ lọc sản phẩm'>
      <header>
        <Link to={PATH.HOME} className='flex items-center font-bold text-gray-900'>
          <Logs size={20} className='mr-3' aria-hidden='true' />
          Tất cả danh mục
        </Link>
      </header>

      <hr className='bg-gray-300 h-[1px] my-4 border-0' />

      <nav aria-label='Danh mục sản phẩm'>
        <h2 className='sr-only'>Danh mục sản phẩm</h2>
        <ul>
          <li className='py-2 pl-2'>
            <Link to={PATH.HOME} className='relative px-2 text-orange-600 font-semibold' aria-current='page'>
              <StepForward className='text-orange-600 size-3 absolute top-1 left-[-10px]' aria-hidden='true' />
              Thời trang nam
            </Link>
          </li>
          <li className='py-2 pl-2'>
            <Link to={PATH.HOME} className='relative px-2 text-gray-800 hover:text-orange-600'>
              Điện tử
            </Link>
          </li>
        </ul>
      </nav>

      <section className='mt-4'>
        <header>
          <h3 className='flex items-center font-bold uppercase text-gray-900'>
            <Funnel className='mr-3 size-3' aria-hidden='true' />
            Bộ lọc tìm kiếm
          </h3>
        </header>

        <hr className='bg-gray-300 h-[1px] my-4 border-0' />

        <fieldset className='my-5'>
          <legend className='text-sm font-medium mb-2 text-gray-900'>Khoảng giá</legend>
          <form className='mt-2' role='search' aria-label='Lọc theo giá'>
            <div className='flex items-start'>
              <FormField
                className='grow'
                name='from'
                placeholder='₫ Từ'
                inputProps={{
                  inputClass: 'p-1 bg-white',
                  'aria-label': 'Giá từ'
                }}
              />
              <span className='mx-2 mt-2 shrink-0' aria-hidden='true'>
                -
              </span>
              <FormField
                className='grow'
                name='to'
                placeholder='₫ Đến'
                inputProps={{
                  inputClass: 'p-1 bg-white',
                  'aria-label': 'Giá đến'
                }}
              />
            </div>
            <Button
              type='submit'
              className='w-full p-2 uppercase bg-orange-600 text-white text-sm hover:bg-orange-700 flex justify-center items-center'
              aria-label='Áp dụng bộ lọc giá'
            >
              Áp dụng
            </Button>
          </form>
        </fieldset>

        <hr className='bg-gray-300 h-[1px] my-4 border-0' />

        <fieldset>
          <legend className='text-sm font-medium mb-2 text-gray-900'>Đánh giá</legend>
          <ul className='my-3'>
            <li className='py-1 pl-2'>
              <Link
                to={PATH.HOME}
                className='flex items-center text-sm gap-1 text-gray-800 hover:text-orange-600'
                aria-label='Sản phẩm 5 sao trở lên'
              >
                <span className='flex' aria-hidden='true'>
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <Star className='size-4 mr-1 text-yellow-600' key={index} />
                    ))}
                </span>
                <span>Trở lên</span>
              </Link>
            </li>
            <li className='py-1 pl-2'>
              <Link
                to={PATH.HOME}
                className='flex items-center text-sm gap-1 text-gray-800 hover:text-orange-600'
                aria-label='Sản phẩm 4 sao trở lên'
              >
                <span className='flex' aria-hidden='true'>
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <Star className='size-4 mr-1 text-yellow-600' key={index} />
                    ))}
                </span>
                <span>Trở lên</span>
              </Link>
            </li>
          </ul>
        </fieldset>

        <hr className='bg-gray-300 h-[1px] my-4 border-0' />

        <footer>
          <Button
            className='w-full p-2 uppercase bg-orange-600 text-white text-sm hover:bg-orange-700 flex justify-center items-center'
            aria-label='Xóa tất cả bộ lọc'
          >
            Xóa tất cả
          </Button>
        </footer>
      </section>
    </aside>
  )
}

export default AsideFilter
