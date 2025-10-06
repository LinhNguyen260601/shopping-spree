import { cn } from '@/utils'
import { Loader2 } from 'lucide-react'
import type React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingText?: string
  children: React.ReactNode
}

const Button = ({ loading, loadingText = 'Loading...', children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn('cursor-pointer flex items-center justify-center gap-2', props.className)}
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
}

export default Button
