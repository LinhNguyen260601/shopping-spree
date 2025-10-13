import Label from '@/components/Label'
import { SORT_BY, type SortBy } from '@/constants'
import { PRICE_OPTIONS } from '@/pages/ProductList/constants'
import { useSortProductListController } from '@/pages/ProductList/controllers'
import type { QueryConfig } from '@/pages/ProductList/types'
import { buildLinkWithUpdatedQuery, cn } from '@/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface SortProductListProps {
  pageSize: number
  queryConfig: QueryConfig
}

const SortProductList = ({ pageSize, queryConfig }: SortProductListProps) => {
  const { order, page } = queryConfig
  const pageNumber = Number(page)

  const isActiveSortBy = (sortByValue: SortBy) => queryConfig.sort_by === sortByValue

  const { handleSort, handleChangePriceOrder } = useSortProductListController(queryConfig)

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
                  className={cn(
                    'h-8 px-4 capitalize text-sm text-center cursor-pointer',
                    isActiveSortBy(SORT_BY.VIEW)
                      ? 'bg-orange-600 text-white hover:bg-orange-700/80'
                      : 'bg-white text-black hover:bg-slate-100'
                  )}
                  aria-pressed='true'
                  aria-label='Sắp xếp theo độ phổ biến'
                  onClick={handleSort(SORT_BY.VIEW)}
                >
                  Phổ biến
                </button>
              </li>
              <li>
                <button
                  className={cn(
                    'h-8 px-4 capitalize text-sm text-center cursor-pointer',
                    isActiveSortBy(SORT_BY.CREATED_AT)
                      ? 'bg-orange-600 text-white hover:bg-orange-700/80'
                      : 'bg-white text-black hover:bg-slate-100'
                  )}
                  aria-pressed='false'
                  aria-label='Sắp xếp theo mới nhất'
                  onClick={handleSort(SORT_BY.CREATED_AT)}
                >
                  Mới nhất
                </button>
              </li>
              <li>
                <button
                  className={cn(
                    'h-8 px-4 capitalize text-sm text-center cursor-pointer',
                    isActiveSortBy(SORT_BY.SOLD)
                      ? 'bg-orange-600 text-white hover:bg-orange-700/80'
                      : 'bg-white text-black hover:bg-slate-100'
                  )}
                  aria-pressed='false'
                  aria-label='Sắp xếp theo bán chạy'
                  onClick={handleSort(SORT_BY.SOLD)}
                >
                  Bán chạy
                </button>
              </li>
              <li>
                <select
                  id='sort-options'
                  className={cn(
                    'h-8 px-4 capitalize text-sm text-left outline-none cursor-pointer',
                    isActiveSortBy(SORT_BY.PRICE)
                      ? 'bg-orange-600 text-white hover:bg-orange-700/80'
                      : 'bg-white text-black hover:bg-slate-100'
                  )}
                  value={order || ''}
                  aria-label='Sắp xếp theo giá'
                  onChange={handleChangePriceOrder}
                >
                  {PRICE_OPTIONS.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={option.value === ''}
                      className='bg-white text-black'
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          </nav>
        </div>

        <nav className='flex items-center' aria-label='Phân trang'>
          <div className='text-sm'>
            <span className='text-orange-800 font-medium' aria-label='Trang hiện tại'>
              {page}
            </span>
            <span className='text-gray-800' aria-label='tổng số trang'>
              /{pageSize || '...'}
            </span>
          </div>
          <div className='ml-2 flex' aria-label='Điều hướng trang'>
            {pageNumber === 1 ? (
              <span className='px-3 h-8 rounded-tl-sm rounded-bl-sm bg-gray-200 text-gray-700 cursor-not-allowed shadow border border-gray-300 flex items-center'>
                <ChevronLeft className='size-4' aria-hidden='true' />
              </span>
            ) : (
              <Link
                to={buildLinkWithUpdatedQuery(queryConfig, 'page', Number(page) - 1)}
                className='px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white text-gray-700 hover:bg-gray-300 cursor-pointer shadow border border-gray-300 flex items-center'
                aria-label='Trang trước'
                aria-disabled='false'
              >
                <ChevronLeft className='size-4' aria-hidden='false' />
              </Link>
            )}
            {pageSize === 0 || pageNumber === pageSize ? (
              <span className='px-3 h-8 rounded-tr-sm rounded-br-sm bg-gray-200 text-gray-700 cursor-not-allowed shadow border border-gray-300 flex items-center'>
                <ChevronRight className='size-4' aria-hidden='true' />
              </span>
            ) : (
              <Link
                to={buildLinkWithUpdatedQuery(queryConfig, 'page', Number(page) + 1)}
                className='shadow px-3 h-8 rounded-tr-sm rounded-br-sm bg-white text-gray-700 hover:bg-gray-300 cursor-pointer border border-gray-300 flex items-center'
                aria-label='Trang sau'
              >
                <ChevronRight className='size-4' aria-hidden='false' />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </section>
  )
}

export default SortProductList
