import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import Input from '../Input'
import type { InputProps } from '@/components/Input/Input'

interface FormFieldProps<T extends FieldValues = FieldValues> {
  name: string
  type?: string
  error?: string
  label?: string
  required?: boolean
  className?: string
  placeholder?: string
  showPasswordToggle?: boolean
  register?: UseFormRegister<T>
  autoFocus?: boolean
  autoComplete?: string
  inputProps?: InputProps
}

const FormField = <T extends FieldValues = FieldValues>({
  name,
  label,
  error,
  register,
  placeholder,
  type = 'text',
  className = '',
  required = false,
  showPasswordToggle = false,
  inputProps
}: FormFieldProps<T>) => {
  return (
    <Input
      id={name}
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      required={required}
      showPasswordToggle={showPasswordToggle}
      error={error}
      className={className}
      {...register?.(name as Path<T>)}
      {...inputProps}
    />
  )
}

export default FormField
