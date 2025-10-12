import Label from '@/components/Label'
import { useInputController } from '@/controllers'
import { cn } from '@/utils'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  required?: boolean
  inputClass?: string
  errorClass?: string
  showPasswordToggle?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    error,
    required,
    showPasswordToggle,
    type = 'text',
    className,
    inputClass = '',
    errorClass = '',
    ...rest
  } = props

  const { isFocused, showPassword, handleFocus, handleTogglePassword } = useInputController()

  const inputType = showPasswordToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type

  const baseInputClasses = 'p-3 w-full outline-none border rounded-sm focus:shadow-sm transition-colors'
  const inputClasses = error
    ? cn(baseInputClasses, 'border-red-300 focus:border-red-500 focus:ring-red-500')
    : cn(baseInputClasses, 'border-gray-300 focus:border-gray-500 focus:ring-gray-500')

  const finalInputClasses = cn(inputClasses, className, inputClass, isFocused ? 'ring-1 ring-gray-500' : '')

  return (
    <div className='form-group'>
      {label && (
        <Label htmlFor={rest.id || ''} className='block text-sm font-medium text-gray-700 mb-2' required={required}>
          {label}
        </Label>
      )}

      <div className='relative'>
        <input
          ref={ref}
          type={inputType}
          className={finalInputClasses}
          onFocus={handleFocus(true)}
          onBlur={handleFocus(false)}
          aria-invalid={!!error}
          aria-describedby={error ? `${rest.id}-error` : undefined}
          {...rest}
        />

        {showPasswordToggle && type === 'password' && (
          <button
            type='button'
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600'
            onClick={handleTogglePassword}
            tabIndex={-1}
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showPassword ? <EyeIcon className='size-5' /> : <EyeClosedIcon className='size-5' />}
          </button>
        )}
      </div>

      <div className='mt-1 h-5 flex items-start'>
        {error && (
          <p
            id={`${rest.id}-error`}
            className={cn('text-red-600 text-sm leading-tight', errorClass)}
            role='alert'
            aria-live='polite'
          >
            {error}
          </p>
        )}
      </div>
    </div>
  )
})

export default Input
