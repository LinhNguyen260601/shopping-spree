import { cn } from '@/utils'
import { useState, type InputHTMLAttributes } from 'react'
import { useController, type FieldValues, type Path, type UseControllerProps } from 'react-hook-form'

export interface InputControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'defaultValue'>,
    UseControllerProps<TFieldValues, TName> {
  classNameInput?: string
  classNameError?: string
}

const InputController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
>(
  props: InputControllerProps<TFieldValues, TName>
) => {
  const { type, onChange, classNameInput, classNameError, className, ...rest } = props

  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== 'number') {
      setLocalValue(valueFromInput)
      field.onChange(event)
      onChange && onChange(event)
    }
  }

  return (
    <div className={cn(className)}>
      <input
        className={cn(
          'p-3 w-full outline-none border border-orange-300 focus:border-orange-500 focus:ring-orange-500 focus-visible:border-orange-500 rounded-sm focus:shadow-sm transition-colors',
          classNameInput
        )}
        {...rest}
        {...field}
        onChange={handleChange}
        value={field.value === undefined ? localValue : field.value}
      />
      <div className={cn('mt-1 text-red-600 min-h-[1.25rem] text-sm', classNameError)}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputController
