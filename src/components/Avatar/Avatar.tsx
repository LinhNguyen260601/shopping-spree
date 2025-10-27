import { cn } from '@/utils'
import { CircleUserRound } from 'lucide-react'
import React, { forwardRef, memo } from 'react'

type AvatarVariant = 'rounded' | 'square'
type AvatarSize = 'sm' | 'md' | 'lg'

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt?: string
  size?: AvatarSize
  variant?: AvatarVariant
  fallback?: React.ReactNode
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ src, alt = 'User avatar', size = 'md', variant = 'rounded', fallback, className, ...rest }, ref) => {
    const variantClasses: Record<AvatarVariant, string> = {
      rounded: 'rounded-full',
      square: 'rounded-md'
    }

    const baseImg = cn('object-cover size-full', variantClasses[variant])

    return (
      <>
        {src ? (
          <img ref={ref} src={src} alt={alt} className={cn(baseImg, className)} {...rest} />
        ) : (
          (fallback ?? <CircleUserRound className='text-white w-2/3 h-2/3' />)
        )}
      </>
    )
  }
)

Avatar.displayName = 'Avatar'

export default memo(Avatar)
