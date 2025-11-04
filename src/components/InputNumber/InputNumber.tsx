import { cn } from '@/utils'
import { forwardRef, useState, type InputHTMLAttributes } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  { errorMessage, className, classNameInput = '', classNameError = '', onChange, value, ...rest },
  ref
) {
  const [localValue, setLocalValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
    const numericValue = rawValue.replace(/\D+/g, '')

    setLocalValue(numericValue)

    if (onChange) {
      const customEvent = {
        ...event,
        target: { ...event.target, value: numericValue }
      }
      onChange(customEvent as React.ChangeEvent<HTMLInputElement>)
    }
  }

  const displayValue = value !== undefined ? String(value).replace(/\D+/g, '') : localValue

  return (
    <div className={className}>
      <input
        ref={ref}
        className={cn(
          'p-3 w-full outline-none border border-orange-300 focus:border-orange-500 focus:ring-orange-500 focus-visible:border-orange-500 rounded-sm focus:shadow-sm transition-colors',
          classNameInput
        )}
        value={displayValue}
        onChange={handleChange}
        {...rest}
      />
      <div className={cn('mt-1 text-red-600 min-h-[1.25rem] text-sm', classNameError)}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
