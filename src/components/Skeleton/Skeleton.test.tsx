import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Skeleton from './Skeleton'

describe('Skeleton', () => {
  it('renders skeleton element', () => {
    render(<Skeleton />)
    const skeleton = document.querySelector('.bg-gray-200')
    expect(skeleton).toBeInTheDocument()
  })

  it('applies default variant (rectangular)', () => {
    render(<Skeleton />)
    const skeleton = document.querySelector('.bg-gray-200')
    expect(skeleton).toHaveClass('rounded')
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Skeleton variant='text' />)
    let skeleton = document.querySelector('.bg-gray-200')
    expect(skeleton).toHaveClass('h-4', 'rounded')

    rerender(<Skeleton variant='circular' />)
    skeleton = document.querySelector('.bg-gray-200')
    expect(skeleton).toHaveClass('rounded-full')

    rerender(<Skeleton variant='rectangular' />)
    skeleton = document.querySelector('.bg-gray-200')
    expect(skeleton).toHaveClass('rounded')
  })

  it('applies default animation (pulse)', () => {
    render(<Skeleton />)
    const skeleton = document.querySelector('.bg-gray-200')
    expect(skeleton).toHaveClass('animate-pulse')
  })

  it('applies animation classes correctly', () => {
    const { rerender } = render(<Skeleton animation='pulse' />)
    let skeleton = document.querySelector('.bg-gray-200')
    expect(skeleton).toHaveClass('animate-pulse')

    rerender(<Skeleton animation='wave' />)
    skeleton = document.querySelector('.bg-gray-200')
    expect(skeleton).toHaveClass('animate-pulse')

    rerender(<Skeleton animation='none' />)
    skeleton = document.querySelector('.bg-gray-200')
    expect(skeleton).not.toHaveClass('animate-pulse')
  })

  it('applies custom className', () => {
    render(<Skeleton className='custom-class' />)
    const skeleton = document.querySelector('.bg-gray-200')
    expect(skeleton).toHaveClass('custom-class')
  })

  it('applies base classes', () => {
    render(<Skeleton />)
    const skeleton = document.querySelector('.bg-gray-200')
    expect(skeleton).toHaveClass('bg-gray-200')
  })
})
