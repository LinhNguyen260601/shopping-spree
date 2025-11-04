import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Input from './Input'

describe('Input', () => {
  it('renders input element', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('displays label when provided', () => {
    render(<Input label='Email Address' />)
    expect(screen.getByText('Email Address')).toBeInTheDocument()
  })

  it('displays error message when provided', () => {
    render(<Input error='This field is required' />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByText('This field is required')).toHaveClass('text-red-600')
  })

  it('shows required asterisk when required is true', () => {
    render(<Input label='Email' required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('toggles password visibility when showPasswordToggle is true', async () => {
    render(<Input label='Password' id='password' type='password' showPasswordToggle />)
    const input = screen.getByLabelText(/password/i) || screen.getByRole('textbox')
    const toggleButton = screen.getByLabelText(/hiện mật khẩu/i) || screen.getByLabelText(/ẩn mật khẩu/i)

    expect(input).toHaveAttribute('type', 'password')
    await userEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'text')
    await userEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'password')
  })

  it('calls onChange handler when value changes', async () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'test')
    expect(handleChange).toHaveBeenCalled()
  })

  it('handles focus events', async () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    await userEvent.click(input)
    expect(input).toHaveFocus()
  })

  it('applies error styling when error is present', () => {
    render(<Input error='Error message' />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-300')
  })

  it('applies default styling when no error', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-orange-300')
  })

  it('applies custom className', () => {
    render(<Input className='custom-class' />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLInputElement | null }
    render(<Input ref={ref as any} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('sets aria-invalid when error exists', () => {
    render(<Input error='Error' />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('sets aria-describedby when error exists', () => {
    render(<Input id='test-input' error='Error' />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error')
  })
})
