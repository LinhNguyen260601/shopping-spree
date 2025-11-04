import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import StarRating from './StarRating'

describe('StarRating', () => {
  it('renders 5 stars', () => {
    render(<StarRating rating={3} />)
    const stars = document.querySelectorAll('svg')
    expect(stars.length).toBeGreaterThanOrEqual(5)
  })

  it('displays rating number when showNumber is true', () => {
    render(<StarRating rating={4.5} showNumber />)
    expect(screen.getByText('(4.5)')).toBeInTheDocument()
  })

  it('does not display rating number when showNumber is false', () => {
    render(<StarRating rating={4.5} showNumber={false} />)
    expect(screen.queryByText('(4.5)')).not.toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<StarRating rating={3} size='sm' />)
    let stars = document.querySelectorAll('svg')
    expect(stars[0]).toHaveClass('size-3')

    rerender(<StarRating rating={3} size='md' />)
    stars = document.querySelectorAll('svg')
    expect(stars[0]).toHaveClass('size-4')

    rerender(<StarRating rating={3} size='lg' />)
    stars = document.querySelectorAll('svg')
    expect(stars[0]).toHaveClass('size-5')
  })

  it('applies color classes correctly', () => {
    const { rerender } = render(<StarRating rating={3} color='yellow' />)
    let stars = document.querySelectorAll('svg')
    expect(stars[0]).toHaveClass('text-yellow-400', 'fill-yellow-400')

    rerender(<StarRating rating={3} color='orange' />)
    stars = document.querySelectorAll('svg')
    expect(stars[0]).toHaveClass('text-orange-500', 'fill-orange-500')

    rerender(<StarRating rating={3} color='red' />)
    stars = document.querySelectorAll('svg')
    expect(stars[0]).toHaveClass('text-red-500', 'fill-red-500')
  })

  it('displays correct number of filled stars for whole number rating', () => {
    render(<StarRating rating={3} />)
    const container = screen.getByRole('img')
    expect(container).toHaveAttribute('aria-label', 'Đánh giá 3 sao')
  })

  it('handles partial star rating', () => {
    render(<StarRating rating={3.5} />)
    const container = screen.getByRole('img')
    expect(container).toHaveAttribute('aria-label', 'Đánh giá 3.5 sao')
  })

  it('applies custom className', () => {
    render(<StarRating rating={3} className='custom-class' />)
    const container = screen.getByRole('img')
    expect(container).toHaveClass('custom-class')
  })

  it('has accessible label', () => {
    render(<StarRating rating={4.5} />)
    const container = screen.getByRole('img')
    expect(container).toHaveAttribute('aria-label', 'Đánh giá 4.5 sao')
  })
})
