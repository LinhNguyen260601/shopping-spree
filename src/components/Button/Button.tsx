import { cn } from '@/utils'
import { Loader2 } from 'lucide-react'
import type React from 'react'
import { memo } from 'react'

type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'neutral'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingText?: string
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 shadow-sm',
  secondary: 'bg-orange-50 text-orange-500 border border-orange-500 hover:bg-orange-100 focus:ring-orange-500',
  outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500',
  ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm',
  neutral: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500 shadow-sm'
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'size-10 p-0'
}

const Button = memo(
  ({
    loading,
    loadingText = 'Loading...',
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className,
    ...props
  }: ButtonProps) => {
    return (
      <button
        {...props}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2 font-medium rounded-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'cursor-pointer',

          // Variant styles
          buttonVariants[variant],

          // Size styles
          buttonSizes[size],

          // Full width
          fullWidth && 'w-full',

          // Custom className
          className
        )}
        disabled={loading || props.disabled}
      >
        {!loading ? (
          children
        ) : (
          <>
            <Loader2 className={cn('animate-spin', size === 'icon' ? 'size-4' : 'size-5')} />
            {loadingText}
          </>
        )}
      </button>
    )
  }
)

export default Button
