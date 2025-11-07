import type { Meta, StoryObj } from '@storybook/react'
import Skeleton from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A skeleton loading component with different variants and animations.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
      description: 'Skeleton shape variant'
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      description: 'Animation type'
    }
  }
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Text: Story = {
  args: {
    variant: 'text',
    animation: 'pulse',
    className: 'w-64 h-4'
  }
}

export const Circular: Story = {
  args: {
    variant: 'circular',
    animation: 'pulse',
    className: 'size-16'
  }
}

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    animation: 'pulse',
    className: 'w-64 h-32'
  }
}

export const Animations: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='mb-2 text-sm text-gray-600'>Pulse Animation</p>
        <Skeleton variant='rectangular' animation='pulse' className='w-64 h-20' />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>Wave Animation</p>
        <Skeleton variant='rectangular' animation='wave' className='w-64 h-20' />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>No Animation</p>
        <Skeleton variant='rectangular' animation='none' className='w-64 h-20' />
      </div>
    </div>
  )
}

export const CardSkeleton: Story = {
  render: () => (
    <div className='border border-gray-200 rounded-lg p-4 w-80'>
      <div className='flex items-center gap-4 mb-4'>
        <Skeleton variant='circular' animation='pulse' className='size-12' />
        <div className='flex-1'>
          <Skeleton variant='text' animation='pulse' className='w-3/4 h-4 mb-2' />
          <Skeleton variant='text' animation='pulse' className='w-1/2 h-3' />
        </div>
      </div>
      <Skeleton variant='rectangular' animation='pulse' className='w-full h-32 mb-4' />
      <Skeleton variant='text' animation='pulse' className='w-full h-4 mb-2' />
      <Skeleton variant='text' animation='pulse' className='w-2/3 h-4' />
    </div>
  )
}

export const ListSkeleton: Story = {
  render: () => (
    <div className='flex flex-col gap-3 w-96'>
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className='flex items-center gap-3'>
          <Skeleton variant='circular' animation='pulse' className='size-10' />
          <div className='flex-1'>
            <Skeleton variant='text' animation='pulse' className='w-full h-4 mb-2' />
            <Skeleton variant='text' animation='pulse' className='w-2/3 h-3' />
          </div>
        </div>
      ))}
    </div>
  )
}

export const TableSkeleton: Story = {
  render: () => (
    <div className='w-full'>
      <div className='flex gap-4 mb-4'>
        <Skeleton variant='text' animation='pulse' className='flex-1 h-4' />
        <Skeleton variant='text' animation='pulse' className='flex-1 h-4' />
        <Skeleton variant='text' animation='pulse' className='flex-1 h-4' />
      </div>
      {[1, 2, 3, 4].map((row) => (
        <div key={row} className='flex gap-4 mb-3'>
          <Skeleton variant='text' animation='pulse' className='flex-1 h-8' />
          <Skeleton variant='text' animation='pulse' className='flex-1 h-8' />
          <Skeleton variant='text' animation='pulse' className='flex-1 h-8' />
        </div>
      ))}
    </div>
  )
}

