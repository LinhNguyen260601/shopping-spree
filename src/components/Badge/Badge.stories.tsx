import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A badge component for displaying labels, counts, or status indicators.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning'],
      description: 'Badge style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size'
    },
    as: {
      control: 'text',
      description: 'HTML element to render as'
    }
  }
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md'
  }
}

export const Secondary: Story = {
  args: {
    children: 'Badge',
    variant: 'secondary',
    size: 'md'
  }
}

export const Destructive: Story = {
  args: {
    children: 'Badge',
    variant: 'destructive',
    size: 'md'
  }
}

export const Outline: Story = {
  args: {
    children: 'Badge',
    variant: 'outline',
    size: 'md'
  }
}

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
    size: 'md'
  }
}

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
    size: 'md'
  }
}

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Badge size='sm'>Small</Badge>
      <Badge size='md'>Medium</Badge>
      <Badge size='lg'>Large</Badge>
    </div>
  )
}

export const WithNumbers: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Badge>1</Badge>
      <Badge>99</Badge>
      <Badge>999+</Badge>
    </div>
  )
}

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Badge variant='default'>Default</Badge>
      <Badge variant='secondary'>Secondary</Badge>
      <Badge variant='destructive'>Destructive</Badge>
      <Badge variant='outline'>Outline</Badge>
      <Badge variant='success'>Success</Badge>
      <Badge variant='warning'>Warning</Badge>
    </div>
  )
}

export const AsLink: Story = {
  render: () => (
    <Badge as='a' variant='outline' className='hover:bg-gray-100 cursor-pointer' {...({ href: '#' } as any)}>
      Link Badge
    </Badge>
  )
}
