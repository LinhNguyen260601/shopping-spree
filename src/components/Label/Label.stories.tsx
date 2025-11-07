import type { Meta, StoryObj } from '@storybook/react'
import Label from './Label'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A label component for form inputs with optional required indicator.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
      description: 'Show required indicator (red asterisk)'
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the associated input element'
    }
  }
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    htmlFor: 'input-id',
    children: 'Label'
  }
}

export const Required: Story = {
  args: {
    htmlFor: 'input-id',
    children: 'Required Field',
    required: true
  }
}

export const WithInput: Story = {
  render: () => (
    <div className='flex flex-col gap-2'>
      <Label htmlFor='email' required>
        Email Address
      </Label>
      <input
        id='email'
        type='email'
        placeholder='Enter your email'
        className='px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500'
      />
    </div>
  )
}

export const MultipleLabels: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='name' required>
          Full Name
        </Label>
        <input
          id='name'
          type='text'
          className='px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='phone'>Phone Number</Label>
        <input
          id='phone'
          type='tel'
          className='px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='address' required>
          Address
        </Label>
        <textarea
          id='address'
          className='px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500'
          rows={3}
        />
      </div>
    </div>
  )
}

