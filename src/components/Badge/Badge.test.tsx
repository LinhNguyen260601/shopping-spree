import { cleanup, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Badge from './Badge'

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('renders as span by default', () => {
    render(<Badge>Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge.tagName).toBe('SPAN')
  })

  it('renders as custom element when as prop is provided', () => {
    render(<Badge as='div'>Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge.tagName).toBe('DIV')
  })

  it('applies default variant classes', () => {
    render(<Badge>Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge).toHaveClass('bg-primary', 'text-primary-foreground')
  })

  it('applies variant classes correctly', () => {
    const variants = ['default', 'secondary', 'destructive', 'outline', 'success', 'warning'] as const
    variants.forEach((variant) => {
      render(<Badge variant={variant}>Test</Badge>)
      const badge = screen.getByText('Test')
      expect(badge).toBeInTheDocument()
      cleanup()
    })
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Badge size='sm'>Test</Badge>)
    let badge = screen.getByText('Test')
    expect(badge).toHaveClass('text-xs')

    rerender(<Badge size='md'>Test</Badge>)
    badge = screen.getByText('Test')
    expect(badge).toHaveClass('text-sm')

    rerender(<Badge size='lg'>Test</Badge>)
    badge = screen.getByText('Test')
    expect(badge).toHaveClass('text-base')
  })

  it('applies custom className', () => {
    render(<Badge className='custom-class'>Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge).toHaveClass('custom-class')
  })

  it('applies base classes', () => {
    render(<Badge>Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge).toHaveClass('inline-flex', 'items-center', 'justify-center', 'font-medium', 'rounded-full')
  })

  it('forwards props to element', () => {
    render(
      <Badge as='div' data-testid='badge' aria-label='Badge label'>
        Test
      </Badge>
    )
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('aria-label', 'Badge label')
  })
})
