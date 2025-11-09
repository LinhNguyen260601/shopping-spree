import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and loading states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'neutral'],
      description: 'Button style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'Button size'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state with spinner'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button'
    }
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md'
  }
}

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'md'
  }
}

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
    size: 'md'
  }
}

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
    size: 'md'
  }
}

export const Danger: Story = {
  args: {
    children: 'Delete',
    variant: 'danger',
    size: 'md'
  }
}

export const Neutral: Story = {
  args: {
    children: 'Button',
    variant: 'neutral',
    size: 'md'
  }
}

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Button size='sm'>Small</Button>
      <Button size='md'>Medium</Button>
      <Button size='lg'>Large</Button>
      <Button size='icon' aria-label='Icon button'>
        <span className='text-xl'>⚙️</span>
      </Button>
    </div>
  )
}

export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
    variant: 'primary'
  }
}

export const LoadingWithText: Story = {
  args: {
    children: 'Processing',
    loading: true,
    loadingText: 'Processing...',
    variant: 'primary'
  }
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    variant: 'primary'
  }
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
    variant: 'primary'
  },
  parameters: {
    layout: 'padded'
  }
}

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <Button variant='primary'>Primary</Button>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='ghost'>Ghost</Button>
        <Button variant='danger'>Danger</Button>
        <Button variant='neutral'>Neutral</Button>
      </div>
      <div className='flex gap-4'>
        <Button variant='primary' disabled>
          Primary Disabled
        </Button>
        <Button variant='secondary' disabled>
          Secondary Disabled
        </Button>
        <Button variant='outline' disabled>
          Outline Disabled
        </Button>
        <Button variant='ghost' disabled>
          Ghost Disabled
        </Button>
      </div>
    </div>
  )
}
