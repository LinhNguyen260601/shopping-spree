import Label from '@/components/Label'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SortProductList = () => {
  return (
    <section className='bg-gray-300/40 py-4 px-3' aria-label='Bộ công cụ sắp xếp và phân trang'>
      <h2 className='sr-only'>Bộ công cụ sắp xếp và phân trang</h2>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <Label className='text-sm font-medium text-gray-900' htmlFor='sort-options'>
            Sắp xếp theo
          </Label>
          <nav aria-label='Tùy chọn sắp xếp'>
            <ul className='flex items-center gap-2'>
              <li>
                <button
                  className='h-8 px-4 capitalize bg-orange-600 text-white text-sm hover:bg-orange-700 text-center cursor-pointer'
                  aria-pressed='true'
                  aria-label='Sắp xếp theo độ phổ biến'
                >
                  Phổ biến
                </button>
              </li>
              <li>
                <button
                  className='h-8 px-4 capitalize bg-white text-gray-900 text-sm hover:bg-gray-100 text-center cursor-pointer border border-gray-300'
                  aria-pressed='false'
                  aria-label='Sắp xếp theo mới nhất'
                >
                  Mới nhất
                </button>
              </li>
              <li>
                <button
                  className='h-8 px-4 capitalize bg-white text-gray-900 text-sm hover:bg-gray-100 text-center cursor-pointer border border-gray-300'
                  aria-pressed='false'
                  aria-label='Sắp xếp theo bán chạy'
                >
                  Bán chạy
                </button>
              </li>
              <li>
                <select
                  id='sort-options'
                  className='h-8 px-4 capitalize bg-white text-gray-900 text-sm hover:bg-gray-100 text-left outline-none cursor-pointer border border-gray-300'
                  defaultValue=''
                  aria-label='Sắp xếp theo giá'
                >
                  <option value='' disabled>
                    Giá
                  </option>
                  <option value='price:asc'>Giá: Thấp đến cao</option>
                  <option value='price:desc'>Giá: Cao đến thấp</option>
                </select>
              </li>
            </ul>
          </nav>
        </div>

        <nav className='flex items-center' aria-label='Phân trang'>
          <div className='text-sm'>
            <span className='text-orange-800 font-medium' aria-label='Trang hiện tại'>
              1
            </span>
            <span className='text-gray-800' aria-label='tổng số trang'>
              /2
            </span>
          </div>
          <div className='ml-2 flex' aria-label='Điều hướng trang'>
            <button
              className='px-3 h-8 rounded-tl-sm rounded-bl-sm bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-not-allowed shadow border border-gray-300'
              disabled
              aria-label='Trang trước'
              aria-disabled='true'
            >
              <ChevronLeft className='size-4' aria-hidden='true' />
            </button>
            <button
              className='shadow px-3 h-8 rounded-tr-sm rounded-br-sm bg-white text-gray-900 hover:bg-gray-100 cursor-pointer border border-gray-300'
              aria-label='Trang sau'
            >
              <ChevronRight className='size-4' aria-hidden='true' />
            </button>
          </div>
        </nav>
      </div>
    </section>
  )
}

export default SortProductList
