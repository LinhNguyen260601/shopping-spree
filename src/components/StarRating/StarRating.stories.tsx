import type { Meta, StoryObj } from '@storybook/react'
import StarRating from './StarRating'

const meta: Meta<typeof StarRating> = {
  title: 'Components/StarRating',
  component: StarRating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A star rating component that displays ratings with customizable size, color, and optional numeric display.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: 'Rating value (0-5)'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Star size'
    },
    color: {
      control: 'select',
      options: ['yellow', 'orange', 'red', 'blue', 'green'],
      description: 'Star color'
    },
    showNumber: {
      control: 'boolean',
      description: 'Show numeric rating value'
    }
  }
}

export default meta
type Story = StoryObj<typeof StarRating>

export const Default: Story = {
  args: {
    rating: 4.5,
    size: 'md',
    color: 'yellow'
  }
}

export const WithNumber: Story = {
  args: {
    rating: 4.5,
    size: 'md',
    color: 'yellow',
    showNumber: true
  }
}

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='mb-2 text-sm text-gray-600'>Small</p>
        <StarRating rating={4.5} size='sm' />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>Medium</p>
        <StarRating rating={4.5} size='md' />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>Large</p>
        <StarRating rating={4.5} size='lg' />
      </div>
    </div>
  )
}

export const Colors: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='mb-2 text-sm text-gray-600'>Yellow</p>
        <StarRating rating={4.5} color='yellow' />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>Orange</p>
        <StarRating rating={4.5} color='orange' />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>Red</p>
        <StarRating rating={4.5} color='red' />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>Blue</p>
        <StarRating rating={4.5} color='blue' />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>Green</p>
        <StarRating rating={4.5} color='green' />
      </div>
    </div>
  )
}

export const DifferentRatings: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='mb-2 text-sm text-gray-600'>5.0 (Perfect)</p>
        <StarRating rating={5} showNumber />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>4.5 (Excellent)</p>
        <StarRating rating={4.5} showNumber />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>4.0 (Very Good)</p>
        <StarRating rating={4} showNumber />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>3.5 (Good)</p>
        <StarRating rating={3.5} showNumber />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>3.0 (Average)</p>
        <StarRating rating={3} showNumber />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>2.5 (Below Average)</p>
        <StarRating rating={2.5} showNumber />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>1.0 (Poor)</p>
        <StarRating rating={1} showNumber />
      </div>
    </div>
  )
}

export const PartialStars: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='mb-2 text-sm text-gray-600'>4.2 (Partial fill)</p>
        <StarRating rating={4.2} showNumber />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>3.7 (Partial fill)</p>
        <StarRating rating={3.7} showNumber />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-600'>2.3 (Partial fill)</p>
        <StarRating rating={2.3} showNumber />
      </div>
    </div>
  )
}

