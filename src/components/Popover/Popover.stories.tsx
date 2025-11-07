import type { Meta, StoryObj } from '@storybook/react'
import Popover from './Popover'
import Button from '../Button'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A popover component that displays content on hover with customizable placement.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end'
      ],
      description: 'Placement of the popover'
    },
    initialOpen: {
      control: 'boolean',
      description: 'Initial open state'
    }
  }
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover
      renderPopover={
        <div className='p-4 bg-white shadow-lg rounded-sm border border-gray-200'>
          <p className='text-sm text-gray-700'>This is a popover content</p>
        </div>
      }
      placement='bottom-end'
    >
      <Button>Hover me</Button>
    </Popover>
  )
}

export const WithMenu: Story = {
  render: () => (
    <Popover
      renderPopover={
        <div className='bg-white shadow-lg rounded-sm border border-gray-200'>
          <button className='w-full text-left px-4 py-2 hover:bg-gray-100 text-sm'>Option 1</button>
          <button className='w-full text-left px-4 py-2 hover:bg-gray-100 text-sm'>Option 2</button>
          <button className='w-full text-left px-4 py-2 hover:bg-gray-100 text-sm'>Option 3</button>
        </div>
      }
    >
      <Button variant='outline'>Open Menu</Button>
    </Popover>
  )
}

export const WithContent: Story = {
  render: () => (
    <Popover
      renderPopover={
        <div className='p-4 bg-white shadow-lg rounded-sm border border-gray-200 w-64'>
          <h3 className='font-semibold text-gray-800 mb-2'>Popover Title</h3>
          <p className='text-sm text-gray-600 mb-3'>
            This is a more detailed popover with multiple lines of content and additional information.
          </p>
          <Button size='sm'>Action Button</Button>
        </div>
      }
    >
      <Button variant='primary'>Hover for Details</Button>
    </Popover>
  )
}

export const DifferentPlacements: Story = {
  render: () => {
    const placements = ['top', 'bottom', 'left', 'right', 'top-start', 'bottom-end'] as const

    return (
      <div className='flex flex-col gap-8 items-center p-20'>
        <div className='flex gap-4'>
          <Popover
            placement='top'
            renderPopover={
              <div className='p-3 bg-white shadow-lg rounded-sm border border-gray-200 whitespace-nowrap'>
                Top
              </div>
            }
          >
            <Button variant='outline'>Top</Button>
          </Popover>

          <Popover
            placement='bottom'
            renderPopover={
              <div className='p-3 bg-white shadow-lg rounded-sm border border-gray-200 whitespace-nowrap'>
                Bottom
              </div>
            }
          >
            <Button variant='outline'>Bottom</Button>
          </Popover>

          <Popover
            placement='left'
            renderPopover={
              <div className='p-3 bg-white shadow-lg rounded-sm border border-gray-200 whitespace-nowrap'>
                Left
              </div>
            }
          >
            <Button variant='outline'>Left</Button>
          </Popover>

          <Popover
            placement='right'
            renderPopover={
              <div className='p-3 bg-white shadow-lg rounded-sm border border-gray-200 whitespace-nowrap'>
                Right
              </div>
            }
          >
            <Button variant='outline'>Right</Button>
          </Popover>
        </div>
      </div>
    )
  }
}

export const WithList: Story = {
  render: () => (
    <Popover
      renderPopover={
        <div className='bg-white shadow-lg rounded-sm border border-gray-200 min-w-[200px]'>
          <div className='p-2'>
            <div className='px-3 py-2 text-xs font-semibold text-gray-500 uppercase'>Navigation</div>
            <button className='w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-gray-700'>
              Home
            </button>
            <button className='w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-gray-700'>
              Products
            </button>
            <button className='w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-gray-700'>
              About
            </button>
            <div className='border-t border-gray-200 my-1' />
            <button className='w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-gray-700'>
              Settings
            </button>
          </div>
        </div>
      }
    >
      <Button variant='ghost'>☰ Menu</Button>
    </Popover>
  )
}

