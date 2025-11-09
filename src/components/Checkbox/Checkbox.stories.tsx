import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Checkbox from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable checkbox component with custom styling.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checked state'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  }
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    checked: false
  }
}

export const Checked: Story = {
  args: {
    checked: true
  }
}

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true
  }
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true
  }
}

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <label className='flex items-center gap-2 cursor-pointer'>
        <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <span>Accept terms and conditions</span>
      </label>
    )
  }
}

export const MultipleCheckboxes: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, label: 'Option 1', checked: false },
      { id: 2, label: 'Option 2', checked: true },
      { id: 3, label: 'Option 3', checked: false }
    ])

    const handleChange = (id: number) => {
      setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
    }

    return (
      <div className='flex flex-col gap-3'>
        {items.map((item) => (
          <label key={item.id} className='flex items-center gap-2 cursor-pointer'>
            <Checkbox checked={item.checked} onChange={() => handleChange(item.id)} />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    )
  }
}

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className='flex flex-col gap-4'>
        <label className='flex items-center gap-2 cursor-pointer'>
          <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <span>Toggle me</span>
        </label>
        <p className='text-sm text-gray-600'>Checked: {checked ? 'Yes' : 'No'}</p>
      </div>
    )
  }
}
