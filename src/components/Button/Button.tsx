import { cn } from '@/utils'
import { Loader2 } from 'lucide-react'
import type React from 'react'
import { memo } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingText?: string
  children: React.ReactNode
}

const Button = memo(({ loading, loadingText = 'Loading...', children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
        props.className
      )}
      disabled={loading || props.disabled}
    >
      {!loading ? (
        children
      ) : (
        <>
          <Loader2 className='size-5 animate-spin' />
          {loadingText}
        </>
      )}
    </button>
  )
})

export default Button
