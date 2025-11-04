import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('renders as checkbox input', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveAttribute('type', 'checkbox')
  })

  it('is checked when checked prop is true', () => {
    render(<Checkbox checked />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('is unchecked by default', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('toggles checked state when clicked', async () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    await userEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('calls onChange handler when clicked', async () => {
    const handleChange = vi.fn()
    render(<Checkbox onChange={handleChange} />)
    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox disabled />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })

  it('applies extraClass', () => {
    render(<Checkbox extraClass='custom-class' />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveClass('custom-class')
  })

  it('applies base checkbox classes', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveClass('cursor-pointer', 'size-5', 'appearance-none', 'rounded-sm')
  })

  it('forwards other input props', () => {
    render(
      <Checkbox
        id='test-checkbox'
        name='test'
        value='test-value'
        aria-label='Test checkbox'
        data-testid='custom-checkbox'
      />
    )
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('id', 'test-checkbox')
    expect(checkbox).toHaveAttribute('name', 'test')
    expect(checkbox).toHaveAttribute('value', 'test-value')
    expect(checkbox).toHaveAttribute('aria-label', 'Test checkbox')
    expect(checkbox).toHaveAttribute('data-testid', 'custom-checkbox')
  })
})
