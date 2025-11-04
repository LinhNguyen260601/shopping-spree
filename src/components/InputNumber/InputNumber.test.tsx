import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import InputNumber from './InputNumber'

describe('InputNumber', () => {
  it('renders input element', () => {
    render(<InputNumber />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('only accepts numeric input', async () => {
    const handleChange = vi.fn()
    render(<InputNumber onChange={handleChange} />)
    const input = screen.getByRole('textbox')

    await userEvent.type(input, 'abc123')
    expect(input).toHaveValue('123')
  })

  it('displays error message when provided', () => {
    render(<InputNumber errorMessage='Invalid number' />)
    expect(screen.getByText('Invalid number')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<InputNumber className='custom-wrapper' />)
    const wrapper = document.querySelector('.custom-wrapper')
    expect(wrapper).toBeInTheDocument()
  })

  it('applies custom classNameInput', () => {
    render(<InputNumber classNameInput='custom-input' />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-input')
  })

  it('applies custom classNameError', () => {
    render(<InputNumber errorMessage='Error' classNameError='custom-error' />)
    const error = screen.getByText('Error')
    expect(error).toHaveClass('custom-error')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLInputElement | null }
    render(<InputNumber ref={ref as any} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('handles controlled value', () => {
    const { rerender } = render(<InputNumber value='100' />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('100')

    rerender(<InputNumber value='200' />)
    expect(input).toHaveValue('200')
  })

  it('handles uncontrolled value', async () => {
    render(<InputNumber />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, '123')
    expect(input).toHaveValue('123')
  })
})
