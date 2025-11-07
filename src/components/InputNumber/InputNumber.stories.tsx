import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import InputNumber from './InputNumber'

const meta: Meta<typeof InputNumber> = {
  title: 'Components/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An input component that only accepts numeric values with error message support.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    errorMessage: {
      control: 'text',
      description: 'Error message to display'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    }
  }
}

export default meta
type Story = StoryObj<typeof InputNumber>

export const Default: Story = {
  args: {
    placeholder: 'Enter number...'
  }
}

export const WithValue: Story = {
  args: {
    value: '12345',
    placeholder: 'Enter number...'
  }
}

export const WithError: Story = {
  args: {
    placeholder: 'Enter number...',
    errorMessage: 'Please enter a valid number'
  }
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    value: '123'
  }
}

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      if (newValue && Number(newValue) > 100) {
        setError('Value must be less than or equal to 100')
      } else {
        setError('')
      }
    }

    return (
      <div className='w-96'>
        <InputNumber
          placeholder='Enter a number (max 100)'
          value={value}
          onChange={handleChange}
          errorMessage={error}
        />
        <p className='mt-2 text-sm text-gray-600'>Value: {value || '(empty)'}</p>
      </div>
    )
  }
}

export const NumericOnly: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className='w-96'>
        <InputNumber
          placeholder='Try typing letters - only numbers will be accepted'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p className='mt-2 text-sm text-gray-600'>Numeric value: {value || '(empty)'}</p>
      </div>
    )
  }
}

export const AllStates: Story = {
  render: () => (
    <div className='flex flex-col gap-6 w-96'>
      <InputNumber placeholder='Default input' />
      <InputNumber placeholder='With value' value='12345' />
      <InputNumber placeholder='With error' errorMessage='Invalid number' />
      <InputNumber placeholder='Disabled' disabled value='999' />
    </div>
  )
}

