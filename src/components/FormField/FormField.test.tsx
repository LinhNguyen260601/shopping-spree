import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { describe, expect, it } from 'vitest'
import FormField from './FormField'

const TestForm = () => {
  const { register } = useForm({
    defaultValues: {
      email: ''
    }
  })

  return (
    <form>
      <FormField name='email' label='Email' type='email' register={register} />
    </form>
  )
}

describe('FormField', () => {
  it('renders input with label', () => {
    render(<TestForm />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('associates label with input via id', () => {
    render(<TestForm />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id', 'email')
    expect(input).toHaveAttribute('name', 'email')
  })

  it('displays error message when provided', () => {
    render(<FormField name='test' error='This field is required' register={undefined} />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('shows required asterisk when required is true', () => {
    render(<FormField name='test' label='Test Field' required register={undefined} />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders password toggle when showPasswordToggle is true', () => {
    render(<FormField name='password' type='password' showPasswordToggle register={undefined} />)
    const toggleButton = screen.queryByLabelText(/hiện mật khẩu/i) || screen.queryByLabelText(/ẩn mật khẩu/i)
    expect(toggleButton).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<FormField name='test' className='custom-class' register={undefined} />)
    const formGroup = document.querySelector('.custom-class')
    expect(formGroup).toBeInTheDocument()
  })

  it('passes placeholder to Input', () => {
    render(<FormField name='test' placeholder='Enter value' register={undefined} />)
    const input = screen.getByPlaceholderText('Enter value')
    expect(input).toBeInTheDocument()
  })

  it('forwards inputProps to Input', () => {
    render(
      <FormField
        name='test'
        inputProps={{
          'data-testid': 'custom-input',
          autoComplete: 'off'
        }}
        register={undefined}
      />
    )
    const input = screen.getByTestId('custom-input')
    expect(input).toHaveAttribute('autoComplete', 'off')
  })

  it('registers with react-hook-form when register is provided', () => {
    const TestFormWithRegister = () => {
      const { register } = useForm({
        defaultValues: {
          username: ''
        }
      })

      return (
        <form>
          <FormField name='username' register={register} />
        </form>
      )
    }

    render(<TestFormWithRegister />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('name', 'username')
  })
})
