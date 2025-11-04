import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Label from './Label'

describe('Label', () => {
  it('renders children correctly', () => {
    render(<Label htmlFor='test-input'>Test Label</Label>)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('associates label with input via htmlFor', () => {
    render(
      <>
        <Label htmlFor='test-input'>Test Label</Label>
        <input id='test-input' type='text' />
      </>
    )
    const label = screen.getByText('Test Label')
    const input = screen.getByLabelText('Test Label')
    expect(label).toHaveAttribute('for', 'test-input')
    expect(input).toHaveAttribute('id', 'test-input')
  })

  it('shows required asterisk when required is true', () => {
    render(
      <Label htmlFor='test-input' required>
        Test Label
      </Label>
    )
    const asterisk = screen.getByText('*')
    expect(asterisk).toBeInTheDocument()
    expect(asterisk).toHaveClass('text-red-500')
  })

  it('does not show required asterisk when required is false', () => {
    render(
      <Label htmlFor='test-input' required={false}>
        Test Label
      </Label>
    )
    const asterisk = screen.queryByText('*')
    expect(asterisk).not.toBeInTheDocument()
  })

  it('applies default classes', () => {
    render(<Label htmlFor='test-input'>Test Label</Label>)
    const label = screen.getByText('Test Label')
    expect(label).toHaveClass('block', 'text-sm', 'font-medium', 'text-gray-700', 'mb-2')
  })

  it('applies custom className', () => {
    render(
      <Label htmlFor='test-input' className='custom-class'>
        Test Label
      </Label>
    )
    const label = screen.getByText('Test Label')
    expect(label).toHaveClass('custom-class')
  })

  it('forwards other label props', () => {
    render(
      <Label htmlFor='test-input' data-testid='custom-label' aria-label='Test label'>
        Test Label
      </Label>
    )
    const label = screen.getByTestId('custom-label')
    expect(label).toHaveAttribute('aria-label', 'Test label')
  })
})
