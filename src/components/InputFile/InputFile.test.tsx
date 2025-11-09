// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    warn: vi.fn()
  }
}))

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import InputFile from './InputFile'

vi.mock('@/pages/User/core', () => ({
  MAX_SIZE_UPLOAD_AVATAR: 1024 * 1024 // 1MB
}))

describe('InputFile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders file input and button', () => {
    render(<InputFile />)
    const button = screen.getByRole('button', { name: /chọn ảnh/i })
    expect(button).toBeInTheDocument()
    const input = document.querySelector('input[type="file"]')
    expect(input).toBeInTheDocument()
  })

  it('opens file dialog when button is clicked', async () => {
    render(<InputFile />)
    const button = screen.getByRole('button', { name: /chọn ảnh/i })
    const input = document.querySelector('input[type="file"]') as HTMLInputElement

    // Mock click event
    const clickSpy = vi.spyOn(input, 'click')
    await userEvent.click(button)
    expect(clickSpy).toHaveBeenCalled()
  })

  it('calls onChange with file when valid file is selected', async () => {
    const handleChange = vi.fn()
    const { getByLabelText } = render(<InputFile inputChange={handleChange} />)

    const input = getByLabelText('Tải ảnh đại diện lên') as HTMLInputElement
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    await userEvent.upload(input, file)

    expect(handleChange).toHaveBeenCalledWith(file)
  })

  it('shows warning for file size exceeding limit', async () => {
    const toast = (await import('react-toastify')).toast
    const handleChange = vi.fn()
    render(<InputFile inputChange={handleChange} />)
    const input = document.querySelector('input[type="file"]') as HTMLInputElement

    const largeFile = new File(['x'.repeat(2 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' })
    await userEvent.upload(input, largeFile)
    expect(toast.warn).toHaveBeenCalledWith('Dung lượng file tối đa 1 MB và định dạng:.JPEG, .PNG')
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('accepts valid image files', async () => {
    const handleChange = vi.fn()
    render(<InputFile inputChange={handleChange} />)
    const input = document.querySelector('input[type="file"]') as HTMLInputElement

    const validFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    await userEvent.upload(input, validFile)
    expect(handleChange).toHaveBeenCalledWith(validFile)
  })

  it('has correct accept attribute', () => {
    render(<InputFile />)
    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    expect(input).toHaveAttribute('accept', '.jpg,.jpeg,.png')
  })

  it('has correct aria-label', () => {
    render(<InputFile />)
    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    expect(input).toHaveAttribute('aria-label', 'Tải ảnh đại diện lên')
  })
})
