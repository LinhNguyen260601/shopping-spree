import Label from '@/components/Label'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SortProductList = () => {
  return (
    <section className='bg-gray-300/40 py-4 px-3' role='toolbar' aria-label='Bộ công cụ sắp xếp và phân trang'>
      <h2 className='sr-only'>Bộ công cụ sắp xếp và phân trang</h2>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <Label className='text-sm font-medium' htmlFor='sort-options'>
            Sắp xếp theo
          </Label>
          <nav aria-label='Tùy chọn sắp xếp'>
            <ul className='flex items-center gap-2' role='list'>
              <li>
                <button
                  className='h-8 px-4 capitalize bg-orange-600 text-white text-sm hover:bg-orange/80 text-center cursor-pointer'
                  aria-pressed='true'
                  aria-label='Sắp xếp theo độ phổ biến'
                >
                  Phổ biến
                </button>
              </li>
              <li>
                <button
                  className='h-8 px-4 capitalize bg-white text-black text-sm hover:bg-slate-100 text-center cursor-pointer'
                  aria-pressed='false'
                  aria-label='Sắp xếp theo mới nhất'
                >
                  Mới nhất
                </button>
              </li>
              <li>
                <button
                  className='h-8 px-4 capitalize bg-white text-black text-sm hover:bg-slate-100 text-center cursor-pointer'
                  aria-pressed='false'
                  aria-label='Sắp xếp theo bán chạy'
                >
                  Bán chạy
                </button>
              </li>
              <li>
                <select
                  id='sort-options'
                  className='h-8 px-4 capitalize bg-white text-black text-sm hover:bg-slate-100 text-left outline-none cursor-pointer'
                  value=''
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
            <span className='text-orange-600 font-medium' aria-label='Trang hiện tại'>
              1
            </span>
            <span aria-label='tổng số trang'>/2</span>
          </div>
          <div className='ml-2 flex' role='group' aria-label='Điều hướng trang'>
            <button
              className='px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow'
              disabled
              aria-label='Trang trước'
              aria-disabled='true'
            >
              <ChevronLeft className='size-4' aria-hidden='true' />
            </button>
            <button
              className='shadow px-3 h-8 rounded-tr-sm rounded-br-sm bg-white hover:bg-slate-100 cursor-pointer'
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
