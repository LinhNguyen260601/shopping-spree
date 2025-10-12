export interface PaginationItem {
  type: 'page' | 'dots'
  value: number | string
  isActive: boolean
  isDisabled?: boolean
}

export interface PaginationConfig {
  currentPage: number
  totalPages: number
}

const DEFAULT_RANGE = 2

const PaginationController = () => {
  const shouldShowDots = (pageNumber: number, currentPage: number, totalPages: number): 'before' | 'after' | null => {
    const isInLeftRange = pageNumber <= DEFAULT_RANGE
    const isInRightRange = pageNumber > totalPages - DEFAULT_RANGE
    const isNearCurrentPage = Math.abs(pageNumber - currentPage) <= DEFAULT_RANGE

    if (isInLeftRange || isInRightRange || isNearCurrentPage) return null
    return pageNumber < currentPage ? 'before' : 'after'
  }

  const generatePaginationItems = (config: PaginationConfig): PaginationItem[] => {
    const { currentPage, totalPages } = config
    const items: PaginationItem[] = []
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

  return {
    generatePaginationItems
  }
}

export default PaginationController
