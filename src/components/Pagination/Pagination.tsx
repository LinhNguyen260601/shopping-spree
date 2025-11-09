import type { QueryConfig } from '@/pages/ProductList/types'
import { buildLinkWithUpdatedQuery, cn } from '@/utils'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

const DEFAULT_RANGE = 2

export interface PaginationConfig {
  currentPage: number
  totalPages: number
}

export interface IPaginationItem {
  type: 'page' | 'dots'
  value: number | string
  isActive: boolean
  isDisabled?: boolean
}

const PaginationItem = ({ item, queryConfig }: { item: IPaginationItem; queryConfig: QueryConfig }) => {
  if (item.type === 'dots') {
    return <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 border border-none'>{item.value}</span>
  }

  return (
    <Link
      to={buildLinkWithUpdatedQuery(queryConfig, 'page', item.value as string)}
      className={cn(
        'bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border transition-colors',
        item.isActive ? 'border-cyan-500 text-cyan-500' : 'border-transparent hover:border-gray-300'
      )}
      aria-current={item.isActive ? 'page' : undefined}
    >
      {item.value}
    </Link>
  )
}

interface PaginationProps {
  pageSize: number
  queryConfig: QueryConfig
}

const Pagination = ({ pageSize, queryConfig }: PaginationProps) => {
  const page = Number(queryConfig.page)

  const shouldShowDots = (pageNumber: number, currentPage: number, totalPages: number): 'before' | 'after' | null => {
    const isInLeftRange = pageNumber <= DEFAULT_RANGE
    const isInRightRange = pageNumber > totalPages - DEFAULT_RANGE
    const isNearCurrentPage = Math.abs(pageNumber - currentPage) <= DEFAULT_RANGE

    if (isInLeftRange || isInRightRange || isNearCurrentPage) return null
    return pageNumber < currentPage ? 'before' : 'after'
  }

  const generatePaginationItems = (config: PaginationConfig): IPaginationItem[] => {
    const { currentPage, totalPages } = config
    const items: IPaginationItem[] = []
    let hasShownBeforeDots = false
    let hasShownAfterDots = false

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      const dotsType = shouldShowDots(pageNumber, currentPage, totalPages)

      if (dotsType === 'before' && !hasShownBeforeDots) {
        hasShownBeforeDots = true
        items.push({
          type: 'dots',
          value: '...',
          isActive: false,
          isDisabled: true
        })
        continue
      }

      if (dotsType === 'after' && !hasShownAfterDots) {
        hasShownAfterDots = true
        items.push({
          type: 'dots',
          value: '...',
          isActive: false,
          isDisabled: true
        })
        continue
      }

      if (!dotsType) {
        items.push({
          type: 'page',
          value: pageNumber,
          isActive: pageNumber === currentPage
        })
      }
    }

    return items
  }

  const paginationItems = useMemo(
    () =>
      pageSize > 0
        ? generatePaginationItems({
            currentPage: page,
            totalPages: pageSize
          })
        : [],
    [page, pageSize]
  )

  return (
    <nav className='flex flex-wrap mt-6 justify-center gap-y-3'>
      {Number(page) === 1 ? (
        <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 opacity-50 cursor-not-allowed'>Trang trước</button>
      ) : (
        <Link
          to={buildLinkWithUpdatedQuery(queryConfig, 'page', Number(page) - 1)}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer'
        >
          Trang trước
        </Link>
      )}

      {paginationItems.map((item, index) => (
        <PaginationItem key={index} item={item} queryConfig={queryConfig} />
      ))}

      {pageSize === 0 || Number(page) === pageSize ? (
        <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 opacity-50 cursor-not-allowed'>Trang tiếp</button>
      ) : (
        <Link
          to={buildLinkWithUpdatedQuery(queryConfig, 'page', Number(page) + 1)}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer'
        >
          Trang tiếp
        </Link>
      )}
    </nav>
  )
}

export default Pagination
