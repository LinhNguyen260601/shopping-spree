import { Star } from 'lucide-react'
import { cn } from '@/utils'

type StarRatingSize = 'sm' | 'md' | 'lg'
type StarRatingColor = 'yellow' | 'orange' | 'red' | 'blue' | 'green'

interface StarRatingProps {
  rating: number
  className?: string
  showNumber?: boolean
  size?: StarRatingSize
  color?: StarRatingColor
}

const StarRating = ({ rating, size = 'md', showNumber = false, className = '', color = 'yellow' }: StarRatingProps) => {
  const sizeClasses = {
    sm: 'size-3',
    md: 'size-4',
    lg: 'size-5'
  }

  const colorClasses = {
    yellow: {
      filled: 'text-yellow-400 fill-yellow-400',
      empty: 'text-gray-300 fill-gray-300'
    },
    orange: {
      filled: 'text-orange-500 fill-orange-500',
      empty: 'text-gray-300 fill-gray-300'
    },
    red: {
      filled: 'text-red-500 fill-red-500',
      empty: 'text-gray-300 fill-gray-300'
    },
    blue: {
      filled: 'text-blue-500 fill-blue-500',
      empty: 'text-gray-300 fill-gray-300'
    },
    green: {
      filled: 'text-green-500 fill-green-500',
      empty: 'text-gray-300 fill-gray-300'
    }
  }

  const renderStar = (index: number) => {
    const starNumber = index + 1
    const isFullyFilled = starNumber <= Math.floor(rating)
    const isPartiallyFilled = starNumber === Math.ceil(rating) && rating % 1 !== 0

    if (isFullyFilled) {
      return <Star key={index} className={cn(sizeClasses[size], colorClasses[color].filled)} />
    }

    if (isPartiallyFilled) {
      const handleWidth = (order: number) => {
        if (order <= rating) return '100%'
        if (order > rating && order - rating < 1) return `${(rating - Math.floor(rating)) * 100}%`
        return '0%'
      }

      return (
        <div key={index} className='relative'>
          {/* Empty star background */}
          <Star className={cn(sizeClasses[size], colorClasses[color].empty)} />
          {/* Filled portion */}
          <div className='absolute top-0 left-0 overflow-hidden' style={{ width: handleWidth(starNumber) }}>
            <Star className={cn(sizeClasses[size], colorClasses[color].filled)} />
          </div>
        </div>
      )
    }

    return <Star key={index} className={cn(sizeClasses[size], colorClasses[color].empty)} />
  }

  return (
    <div className={cn('flex items-center gap-1', className)} role='img' aria-label={`Đánh giá ${rating} sao`}>
      {Array.from({ length: 5 }, (_, index) => renderStar(index))}
      {showNumber && <span className='ml-1 text-sm text-gray-700'>({rating.toFixed(1)})</span>}
    </div>
  )
}

export default StarRating
