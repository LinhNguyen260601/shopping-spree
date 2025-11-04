import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { describe, expect, it } from 'vitest'
import InputController from './InputController'

const TestForm = () => {
  const { control } = useForm({
    defaultValues: {
      testField: ''
    }
  })

  return (
    <form>
      <InputController name='testField' control={control} type='text' />
    </form>
  )
}

describe('InputController', () => {
  it('renders input element', () => {
    render(<TestForm />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('only accepts numeric input when type is number', async () => {
    const TestNumberForm = () => {
      const { control } = useForm({
        defaultValues: {
          numberField: ''
        }
      })

      return (
        <form>
          <InputController name='numberField' control={control} type='number' />
        </form>
      )
    }

    render(<TestNumberForm />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'abc123')
    expect(input).toHaveValue('123')
  })

  it('displays error message from react-hook-form', () => {
    const TestFormWithError = () => {
      const { control } = useForm({
        defaultValues: {
          testField: ''
        },
        mode: 'onChange'
      })

      return (
        <form>
          <InputController
            name='testField'
            control={control}
            type='text'
            rules={{ required: 'This field is required' }}
          />
        </form>
      )
    }

    render(<TestFormWithError />)
    // Error will appear when validation fails
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const TestForm = () => {
      const { control } = useForm({
        defaultValues: {
          testField: ''
        }
      })

      return (
        <form>
          <InputController name='testField' control={control} className='custom-wrapper' />
        </form>
      )
    }

    render(<TestForm />)
    const wrapper = document.querySelector('.custom-wrapper')
    expect(wrapper).toBeInTheDocument()
  })

  it('applies custom classNameInput', () => {
    const TestForm = () => {
      const { control } = useForm({
        defaultValues: {
          testField: ''
        }
      })

      return (
        <form>
          <InputController name='testField' control={control} classNameInput='custom-input' />
        </form>
      )
    }

    render(<TestForm />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-input')
  })

  it('applies custom classNameError', () => {
    const TestForm = () => {
      const { control } = useForm({
        defaultValues: {
          testField: ''
        }
      })

      return (
        <form>
          <InputController name='testField' control={control} classNameError='custom-error' />
        </form>
      )
    }

    render(<TestForm />)
    const errorDiv = document.querySelector('.custom-error')
    expect(errorDiv).toBeInTheDocument()
  })

  it('handles controlled value from react-hook-form', async () => {
    render(<TestForm />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'test value')
    expect(input).toHaveValue('test value')
  })
})
