import { cn } from '@/utils'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string
  className?: string
  required?: boolean
  children: React.ReactNode
}

const Label = (props: LabelProps) => {
  const { htmlFor, children, className = '', required = false, ...rest } = props

  return (
    <label htmlFor={htmlFor} className={cn('block text-sm font-medium text-gray-700 mb-2', className)} {...rest}>
      {children}
      {required && <span className='text-red-500 ml-1'>*</span>}
    </label>
  )
}

export default Label
