import Label from '@/components/Label'
import { SORT_BY, SORT_ORDER } from '@/constants'
import { useSortProductListController } from '@/pages/ProductList/controllers'
import type { QueryConfig } from '@/pages/ProductList/types'
import type { SortBy } from '@/types'
import { buildLinkWithUpdatedQuery, cn } from '@/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

interface SortProductListProps {
  pageSize: number
  queryConfig: QueryConfig
}

const SortProductList = ({ pageSize, queryConfig }: SortProductListProps) => {
  const { t } = useTranslation('productList')
  const { order, page } = queryConfig
  const pageNumber = Number(page)

  const isActiveSortBy = (sortByValue: SortBy) => queryConfig.sort_by === sortByValue

  const { handleSort, handleChangePriceOrder } = useSortProductListController(queryConfig)

  const priceOptions = useMemo(
    () => [
      {
        value: '',
        label: t('price')
      },
      {
        value: SORT_ORDER.ASC,
        label: t('priceLowToHigh')
      },
      {
        value: SORT_ORDER.DESC,
        label: t('priceHighToLow')
      }
    ],
    [t]
  )

  return (
    <section className='bg-gray-300/40 py-4 px-3' aria-label='Bộ công cụ sắp xếp và phân trang'>
      <h2 className='sr-only'>Bộ công cụ sắp xếp và phân trang</h2>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <Label className='text-sm font-medium text-gray-900' htmlFor='sort-options'>
            {t('sortBy')}
          </Label>
          <nav aria-label={t('sortBy')}>
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
                  aria-label={t('popular')}
                  onClick={handleSort(SORT_BY.VIEW)}
                >
                  {t('popular')}
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
                  aria-label={t('newest')}
                  onClick={handleSort(SORT_BY.CREATED_AT)}
                >
                  {t('newest')}
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
                  aria-label={t('bestselling')}
                  onClick={handleSort(SORT_BY.SOLD)}
                >
                  {t('bestselling')}
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
                  aria-label={t('price')}
                  onChange={handleChangePriceOrder}
                >
                  {priceOptions.map((option) => (
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

        <nav className='flex items-center' aria-label={t('nextPage')}>
          <div className='text-sm'>
            <span className='text-orange-800 font-medium' aria-label={t('currentPage')}>
              {page}
            </span>
            <span className='text-gray-800' aria-label={t('totalPages')}>
              /{pageSize || '...'}
            </span>
          </div>
          <div className='ml-2 flex' aria-label={t('nextPage')}>
            {pageNumber === 1 ? (
              <span className='px-3 h-8 rounded-tl-sm rounded-bl-sm bg-gray-200 text-gray-700 cursor-not-allowed shadow border border-gray-300 flex items-center'>
                <ChevronLeft className='size-4' aria-hidden='true' />
              </span>
            ) : (
              <Link
                to={buildLinkWithUpdatedQuery(queryConfig, 'page', Number(page) - 1)}
                className='px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white text-gray-700 hover:bg-gray-300 cursor-pointer shadow border border-gray-300 flex items-center'
                aria-label={t('previousPage')}
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
                aria-label={t('nextPage')}
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
