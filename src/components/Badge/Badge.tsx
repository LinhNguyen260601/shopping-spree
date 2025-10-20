import { cn } from '@/utils'
import { type ReactNode, type ElementType } from 'react'

type BadgeSize = 'sm' | 'md' | 'lg'
type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'

interface BadgeProps {
  as?: ElementType
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}

const Badge = ({
  as: Component = 'span',
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: BadgeProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full'

  const variantClasses = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'border border-input bg-background text-foreground',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800'
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }

  return (
    <Component className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)} {...props}>
      {children}
    </Component>
  )
}

export default Badge
