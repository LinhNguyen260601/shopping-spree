import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Avatar from './Avatar'

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src='https://example.com/avatar.jpg' alt='User avatar' />)
    const img = screen.getByAltText('User avatar')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg')
  })

  it('renders fallback icon when src is not provided', () => {
    const { container } = render(<Avatar />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders custom fallback when provided', () => {
    render(<Avatar fallback={<div>Custom Fallback</div>} />)
    expect(screen.getByText('Custom Fallback')).toBeInTheDocument()
  })

  it('applies default size and variant classes', () => {
    render(<Avatar src='https://example.com/avatar.jpg' />)
    const img = screen.getByRole('img')
    expect(img).toHaveClass('size-10') // default md size
    expect(img).toHaveClass('rounded-full') // default rounded variant
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Avatar src='https://example.com/avatar.jpg' size='sm' />)
    let img = screen.getByRole('img')
    expect(img).toHaveClass('size-8')

    rerender(<Avatar src='https://example.com/avatar.jpg' size='lg' />)
    img = screen.getByRole('img')
    expect(img).toHaveClass('size-16')

    rerender(<Avatar src='https://example.com/avatar.jpg' size='xl' />)
    img = screen.getByRole('img')
    expect(img).toHaveClass('size-24')
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Avatar src='https://example.com/avatar.jpg' variant='rounded' />)
    let img = screen.getByRole('img')
    expect(img).toHaveClass('rounded-full')

    rerender(<Avatar src='https://example.com/avatar.jpg' variant='square' />)
    img = screen.getByRole('img')
    expect(img).toHaveClass('rounded-md')
  })

  it('applies custom className', () => {
    render(<Avatar src='https://example.com/avatar.jpg' className='custom-class' />)
    const img = screen.getByRole('img')
    expect(img).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLImageElement | null }
    render(<Avatar src='https://example.com/avatar.jpg' ref={ref as any} />)
    expect(ref.current).toBeInstanceOf(HTMLImageElement)
  })

  it('applies other image attributes', () => {
    render(
      <Avatar src='https://example.com/avatar.jpg' alt='Custom alt' width={100} height={100} data-testid='avatar' />
    )
    const img = screen.getByAltText('Custom alt')
    expect(img).toHaveAttribute('width', '100')
    expect(img).toHaveAttribute('height', '100')
    expect(img).toHaveAttribute('data-testid', 'avatar')
  })
})
