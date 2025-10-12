import { PATH } from '@/constants'
import { PaginationController } from '@/controllers'
import { type PaginationItem as PaginationItemType } from '@/controllers/pagination.controller'
import type { QueryConfig } from '@/pages/ProductList/types'
import { cn } from '@/utils'
import { useMemo } from 'react'
import { createSearchParams, Link } from 'react-router-dom'

const createPaginationLink = (queryConfig: QueryConfig, page: number | string) => ({
  pathname: PATH.HOME,
  search: createSearchParams({
    ...queryConfig,
    page: page.toString()
  }).toString()
})

const PaginationItem = ({ item, queryConfig }: { item: PaginationItemType; queryConfig: QueryConfig }) => {
  if (item.type === 'dots') {
    return <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 border border-none'>{item.value}</span>
  }

  return (
    <Link
      to={createPaginationLink(queryConfig, item.value)}
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

  const { generatePaginationItems } = PaginationController()

  const paginationItems = useMemo(
    () =>
      generatePaginationItems({
        currentPage: page,
        totalPages: pageSize
      }),
    [page, pageSize]
  )

  return (
    <nav className='flex flex-wrap mt-6 justify-center gap-y-3'>
      {Number(page) === 1 ? (
        <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 opacity-50 cursor-not-allowed'>Prev</button>
      ) : (
        <Link
          to={createPaginationLink(queryConfig, Number(page) - 1)}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer'
        >
          Prev
        </Link>
      )}

      {paginationItems.map((item, index) => (
        <PaginationItem key={index} item={item} queryConfig={queryConfig} />
      ))}

      {Number(page) === pageSize ? (
        <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 opacity-50 cursor-not-allowed'>Next</button>
      ) : (
        <Link
          to={createPaginationLink(queryConfig, Number(page) + 1)}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer'
        >
          Next
        </Link>
      )}
    </nav>
  )
}

export default Pagination
