import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    await userEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when loading', () => {
    render(<Button loading>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('shows loading state with default text', () => {
    render(<Button loading>Click me</Button>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows loading state with custom text', () => {
    render(
      <Button loading loadingText='Please wait...'>
        Click me
      </Button>
    )
    expect(screen.getByText('Please wait...')).toBeInTheDocument()
  })

  it('shows loader icon when loading', () => {
    render(<Button loading>Click me</Button>)
    const loader = document.querySelector('svg')
    expect(loader).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant='primary'>Test</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('bg-orange-500')

    rerender(<Button variant='secondary'>Test</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-orange-50')

    rerender(<Button variant='outline'>Test</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('border-gray-300')

    rerender(<Button variant='ghost'>Test</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('text-gray-600')

    rerender(<Button variant='danger'>Test</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-red-500')

    rerender(<Button variant='neutral'>Test</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-gray-500')
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size='sm'>Test</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('h-8')

    rerender(<Button size='md'>Test</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-10')

    rerender(<Button size='lg'>Test</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-12')

    rerender(<Button size='icon'>Test</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('size-10')
  })

  it('applies fullWidth class when fullWidth is true', () => {
    render(<Button fullWidth>Test</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('w-full')
  })

  it('applies custom className', () => {
    render(<Button className='custom-class'>Test</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('applies base button classes', () => {
    render(<Button>Test</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'font-medium',
      'rounded-sm',
      'transition-colors'
    )
  })

  it('forwards other button props', () => {
    render(
      <Button type='submit' aria-label='Submit form' data-testid='submit-btn'>
        Submit
      </Button>
    )
    const button = screen.getByTestId('submit-btn')
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toHaveAttribute('aria-label', 'Submit form')
  })
})
