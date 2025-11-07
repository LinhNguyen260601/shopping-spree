import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile input component with label, error handling, and password toggle support.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type'
    },
    label: {
      control: 'text',
      description: 'Label text'
    },
    error: {
      control: 'text',
      description: 'Error message'
    },
    required: {
      control: 'boolean',
      description: 'Show required indicator'
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Show password visibility toggle (only for password type)'
    }
  }
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    type: 'text'
  }
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    id: 'email-input'
  }
}

export const Required: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    required: true,
    id: 'username-input'
  }
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    error: 'Please enter a valid email address',
    id: 'email-error'
  }
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    id: 'password-input'
  }
}

export const PasswordWithToggle: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    showPasswordToggle: true,
    id: 'password-toggle'
  }
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    id: 'disabled-input'
  }
}

export const AllStates: Story = {
  render: () => (
    <div className='flex flex-col gap-6 w-96'>
      <Input label='Default' placeholder='Default input' id='default' />
      <Input label='Required' placeholder='Required input' required id='required' />
      <Input label='With Error' placeholder='Input with error' error='This field has an error' id='error' />
      <Input label='Disabled' placeholder='Disabled input' disabled id='disabled' />
      <Input
        label='Password with Toggle'
        type='password'
        placeholder='Enter password'
        showPasswordToggle
        id='password'
      />
    </div>
  )
}

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      if (newValue.length > 0 && newValue.length < 3) {
        setError('Must be at least 3 characters')
      } else {
        setError('')
      }
    }

    return (
      <div className='w-96'>
        <Input
          label='Interactive Input'
          placeholder='Type something...'
          value={value}
          onChange={handleChange}
          error={error}
          id='interactive'
        />
        <p className='mt-2 text-sm text-gray-600'>Value: {value || '(empty)'}</p>
      </div>
    )
  }
}

export const DifferentTypes: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-96'>
      <Input label='Text' type='text' placeholder='Enter text' id='text' />
      <Input label='Email' type='email' placeholder='Enter email' id='email' />
      <Input label='Number' type='number' placeholder='Enter number' id='number' />
      <Input label='Tel' type='tel' placeholder='Enter phone' id='tel' />
      <Input label='URL' type='url' placeholder='Enter URL' id='url' />
      <Input label='Search' type='search' placeholder='Search...' id='search' />
    </div>
  )
}

