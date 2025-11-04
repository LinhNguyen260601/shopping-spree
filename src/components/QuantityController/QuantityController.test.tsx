import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import QuantityController from './QuantityController'

describe('QuantityController', () => {
  it('renders decrease and increase buttons', () => {
    render(<QuantityController value={5} />)
    expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument()
    expect(screen.getByLabelText('Increase quantity')).toBeInTheDocument()
  })

  it('renders input field', () => {
    render(<QuantityController value={5} />)
    const input = screen.getByLabelText('Quantity')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('5')
  })

  it('increases quantity when increase button is clicked', async () => {
    const handleIncrease = vi.fn()
    render(<QuantityController value={5} onIncrease={handleIncrease} />)
    const increaseButton = screen.getByLabelText('Increase quantity')
    await userEvent.click(increaseButton)
    expect(handleIncrease).toHaveBeenCalledWith(6)
  })

  it('decreases quantity when decrease button is clicked', async () => {
    const handleDecrease = vi.fn()
    render(<QuantityController value={5} onDecrease={handleDecrease} />)
    const decreaseButton = screen.getByLabelText('Decrease quantity')
    await userEvent.click(decreaseButton)
    expect(handleDecrease).toHaveBeenCalledWith(4)
  })

  it('does not decrease below 1', async () => {
    const handleDecrease = vi.fn()
    render(<QuantityController value={1} onDecrease={handleDecrease} />)
    const decreaseButton = screen.getByLabelText('Decrease quantity')
    await userEvent.click(decreaseButton)
    expect(handleDecrease).toHaveBeenCalledWith(1)
  })

  it('does not increase above max', async () => {
    const handleIncrease = vi.fn()
    render(<QuantityController value={100} max={100} onIncrease={handleIncrease} />)
    const increaseButton = screen.getByLabelText('Increase quantity')
    await userEvent.click(increaseButton)
    expect(handleIncrease).toHaveBeenCalledWith(100)
  })

  it('calls onType when input value changes', async () => {
    const handleType = vi.fn()
    render(<QuantityController value={5} onType={handleType} />)
    const input = screen.getByLabelText('Quantity')
    await userEvent.clear(input)
    await userEvent.type(input, '10')
    expect(handleType).toHaveBeenCalled()
  })

  it('calls onFocusOut when input loses focus', async () => {
    const handleFocusOut = vi.fn()
    render(<QuantityController value={5} onFocusOut={handleFocusOut} />)
    const input = screen.getByLabelText('Quantity')
    await userEvent.click(input)
    await userEvent.tab()
    expect(handleFocusOut).toHaveBeenCalled()
  })

  it('enforces minimum value of 1', async () => {
    const handleType = vi.fn()
    render(<QuantityController value={5} onType={handleType} />)
    const input = screen.getByLabelText('Quantity')
    await userEvent.clear(input)
    await userEvent.type(input, '0')
    expect(handleType).toHaveBeenCalledWith(1)
  })

  it('enforces maximum value', async () => {
    const handleType = vi.fn()
    render(<QuantityController value={5} max={10} onType={handleType} />)
    const input = screen.getByLabelText('Quantity')
    await userEvent.clear(input)
    await userEvent.type(input, '20')
    expect(handleType).toHaveBeenCalledWith(10)
  })

  it('applies custom classNameWrapper', () => {
    render(<QuantityController value={5} classNameWrapper='custom-wrapper' />)
    const wrapper = document.querySelector('.custom-wrapper')
    expect(wrapper).toBeInTheDocument()
  })
})
