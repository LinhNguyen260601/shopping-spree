import { Star } from 'lucide-react'
import { cn } from '@/utils'

interface StarRatingProps {
  rating: number
  size?: string
  showNumber?: boolean
}

const StarRating = ({ rating, size = 'size-4', showNumber = false }: StarRatingProps) => {
  const handleWidth = (order: number) => {
    if (order <= rating) return '100%'
    if (order > rating && order - rating < 1) return `${(rating - Math.floor(rating)) * 100}%`
    return '0%'
  }

  return (
    <div className={cn('flex items-center gap-1')} role='img' aria-label={`Đánh giá ${rating} sao`}>
      {/* Render 5 stars with dynamic width */}
      {Array.from({ length: 5 }, (_, index) => {
        const width = handleWidth(index + 1)

        return (
          <div key={index} className='relative'>
            {/* Background star (gray) */}
            <Star className={cn('text-gray-300 fill-current', size)} aria-hidden='true' />

            {/* Foreground star (yellow) with dynamic width */}
            <div className='absolute top-0 left-0 overflow-hidden' style={{ width }}>
              <Star className={cn('text-yellow-600 fill-current', size)} aria-hidden='true' />
            </div>
          </div>
        )
      })}

      {/* Screen reader text */}
      <span className='sr-only'>{rating} sao</span>

      {/* Optional number display */}
      {showNumber && <span className={cn('ml-1 text-sm text-gray-700')}>({rating})</span>}
    </div>
  )
}

export default StarRating
