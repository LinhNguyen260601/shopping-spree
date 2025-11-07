import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import QuantityController from './QuantityController'

const meta: Meta<typeof QuantityController> = {
  title: 'Components/QuantityController',
  component: QuantityController,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A quantity controller component with increase/decrease buttons and input field.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 1 },
      description: 'Current quantity value'
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum allowed quantity'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the controller'
    }
  }
}

export default meta
type Story = StoryObj<typeof QuantityController>

export const Default: Story = {
  args: {
    value: 1,
    max: 100
  }
}

export const WithValue: Story = {
  args: {
    value: 5,
    max: 100
  }
}

export const WithMaxLimit: Story = {
  args: {
    value: 10,
    max: 10
  }
}

export const Disabled: Story = {
  args: {
    value: 3,
    max: 100,
    disabled: true
  }
}

export const Interactive: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(1)

    return (
      <div className='flex flex-col gap-4'>
        <QuantityController
          value={quantity}
          max={10}
          onType={(value) => setQuantity(value)}
          onIncrease={(value) => setQuantity(value)}
          onDecrease={(value) => setQuantity(value)}
          onFocusOut={(value) => setQuantity(value)}
        />
        <p className='text-sm text-gray-600'>Current quantity: {quantity}</p>
      </div>
    )
  }
}

export const WithCallbacks: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(1)
    const [log, setLog] = useState<string[]>([])

    const addLog = (action: string, value: number) => {
      setLog((prev) => [...prev, `${action}: ${value}`])
    }

    return (
      <div className='flex flex-col gap-4'>
        <QuantityController
          value={quantity}
          max={10}
          onType={(value) => {
            setQuantity(value)
            addLog('Typed', value)
          }}
          onIncrease={(value) => {
            setQuantity(value)
            addLog('Increased', value)
          }}
          onDecrease={(value) => {
            setQuantity(value)
            addLog('Decreased', value)
          }}
          onFocusOut={(value) => {
            setQuantity(value)
            addLog('Focus Out', value)
          }}
        />
        <div className='p-4 border border-gray-200 rounded-sm bg-gray-50'>
          <p className='text-sm font-medium text-gray-700 mb-2'>Action Log:</p>
          <div className='flex flex-col gap-1'>
            {log.length > 0 ? (
              log.slice(-5).map((entry, index) => (
                <p key={index} className='text-xs text-gray-600'>
                  {entry}
                </p>
              ))
            ) : (
              <p className='text-xs text-gray-500'>No actions yet</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export const RespectsMaxLimit: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(5)

    return (
      <div className='flex flex-col gap-4'>
        <QuantityController
          value={quantity}
          max={5}
          onType={(value) => setQuantity(value)}
          onIncrease={(value) => setQuantity(value)}
          onDecrease={(value) => setQuantity(value)}
        />
        <p className='text-sm text-gray-600'>Max: 5, Current: {quantity}</p>
        <p className='text-xs text-gray-500'>Try increasing beyond 5 - it will cap at the max value</p>
      </div>
    )
  }
}

export const MinimumValue: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(1)

    return (
      <div className='flex flex-col gap-4'>
        <QuantityController
          value={quantity}
          max={100}
          onType={(value) => setQuantity(value)}
          onIncrease={(value) => setQuantity(value)}
          onDecrease={(value) => setQuantity(value)}
        />
        <p className='text-sm text-gray-600'>Current: {quantity}</p>
        <p className='text-xs text-gray-500'>Minimum value is 1 - cannot go below</p>
      </div>
    )
  }
}

