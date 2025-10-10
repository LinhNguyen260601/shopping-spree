import { cn } from '@/utils'
import { Star } from 'lucide-react'

interface HalfStarProps {
  size?: string
  fullColor?: string
  emptyColor?: string
}

const yellowStarWrapperStyle: React.CSSProperties = { clipPath: 'inset(0 50% 0 0)' }

const HalfStar = ({ size = 'size-4', fullColor = 'text-yellow-500', emptyColor = 'text-gray-300' }: HalfStarProps) => {
  return (
    <span className={cn('relative inline-block', size)} role='img' aria-label='Nửa sao đánh giá'>
      {/* Star with gray color (part not rated) */}
      <Star className={cn('absolute top-0 left-0 size-full fill-current', emptyColor)} aria-hidden='true' />

      {/* Star with yellow color, cut to only display the left half */}
      <span
        className={cn('absolute top-0 left-0 size-full overflow-hidden')}
        style={yellowStarWrapperStyle}
        aria-hidden='true'
      >
        <Star className={cn('size-full fill-current', fullColor)} />
      </span>
    </span>
  )
}

export default HalfStar
