import { cn } from '@/utils'

interface SkeletonProps {
  className?: string
  animation?: 'pulse' | 'wave' | 'none'
  variant?: 'text' | 'circular' | 'rectangular'
}

const Skeleton = ({ className, variant = 'rectangular', animation = 'pulse' }: SkeletonProps) => {
  const baseClasses = 'bg-gray-200'

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded'
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse',
    none: ''
  }

  return <div className={cn(baseClasses, variantClasses[variant], animationClasses[animation], className)} />
}

export default Skeleton
