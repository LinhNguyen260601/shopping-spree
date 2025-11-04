import React, { forwardRef, memo } from 'react'
import { cn } from '@/utils'
import { CircleUserRound } from 'lucide-react'

type AvatarVariant = 'rounded' | 'square'
type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt?: string
  size?: AvatarSize
  variant?: AvatarVariant
  fallback?: React.ReactNode
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ src, alt = 'User avatar', size = 'md', variant = 'rounded', fallback, className, ...rest }, ref) => {
    const sizeClasses: Record<AvatarSize, string> = {
      sm: 'size-8',
      md: 'size-10',
      lg: 'size-16',
      xl: 'size-24'
    }

    const variantClasses: Record<AvatarVariant, string> = {
      rounded: 'rounded-full',
      square: 'rounded-md'
    }

    const baseImg = cn(variantClasses[variant], size ? sizeClasses[size] : 'size-full', 'object-cover')

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
