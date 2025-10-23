import Button from '@/components/Button'
import InputNumber, { type InputNumberProps } from '@/components/InputNumber'
import { cn } from '@/utils'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

interface QuantityControllerProps extends InputNumberProps {
  max?: number
  classNameWrapper?: string
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
  onDecrease?: (value: number) => void
  onIncrease?: (value: number) => void
}

const QuantityController = ({
  value,
  onType,
  max = 100,
  onFocusOut,
  onDecrease,
  onIncrease,
  classNameWrapper = 'ml-10',
  ...rest
}: QuantityControllerProps) => {
  const [localValue, setLocalValue] = useState<number>(Number(value || 0))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) _value = max
    if (_value < 1) _value = 1
    onType && onType(_value)
    setLocalValue(_value)
  }

  const handleIncrease = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) _value = max
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const handleDecrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) _value = 1
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(event.target.value))
  }

  return (
    <div className={cn('flex items-center', classNameWrapper)}>
      <Button
        variant='outline'
        size='icon'
        className='size-8 rounded-l-sm rounded-r-none'
        aria-label='Decrease quantity'
        onClick={handleDecrease}
      >
        <Minus className='size-4' />
      </Button>
      <InputNumber
        value={value || localValue}
        classNameError='hidden'
        classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
        aria-label='Quantity'
        onBlur={handleBlur}
        onChange={handleChange}
        {...rest}
      />
      <Button
        variant='outline'
        size='icon'
        className='size-8 rounded-r-sm rounded-l-none'
        aria-label='Increase quantity'
        onClick={handleIncrease}
      >
        <Plus className='size-4' />
      </Button>
    </div>
  )
}

export default QuantityController
