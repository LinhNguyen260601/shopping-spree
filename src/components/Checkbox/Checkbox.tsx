import { cn } from '@/utils'
import React from 'react'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  extraClass?: string
}

const Checkbox = ({ extraClass = '', ...rest }: CheckboxProps) => {
  return (
    <input
      type='checkbox'
      className={cn(
        `cursor-pointer size-5 appearance-none rounded-sm
        border border-gray-300
        checked:bg-orange-500 checked:border-orange-500
        checked:before:content-['✔'] checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center`,
        extraClass
      )}
      {...rest}
    />
  )
}

export default Checkbox
