import { PATH, SORT_BY, type SortBy } from '@/constants'
import type { QueryConfig } from '@/pages/ProductList/types'
import { buildLinkWithUpdatedQuery } from '@/utils'
import { createSearchParams, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'

const useSortProductListController = (queryConfig: QueryConfig) => {
  const navigate = useNavigate()

  const handleSort = (sortByValue: SortBy) => () => {
    navigate(omit(buildLinkWithUpdatedQuery(queryConfig, 'sort_by', sortByValue), ['order']))
  }

  const handleChangePriceOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate({
      pathname: PATH.HOME,
      search: createSearchParams({
        ...queryConfig,
        sort_by: SORT_BY.PRICE,
        order: event.target.value
      }).toString()
    })
  }

  return { handleSort, handleChangePriceOrder }
}

export default useSortProductListController
