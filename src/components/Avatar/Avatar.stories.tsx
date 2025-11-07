import type { Meta, StoryObj } from '@storybook/react'
import Avatar from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An avatar component for displaying user profile images with fallback support.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Avatar size'
    },
    variant: {
      control: 'select',
      options: ['rounded', 'square'],
      description: 'Avatar shape variant'
    },
    src: {
      control: 'text',
      description: 'Image source URL'
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image'
    }
  }
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
    size: 'md',
    variant: 'rounded'
  }
}

export const WithoutImage: Story = {
  args: {
    alt: 'User avatar',
    size: 'md',
    variant: 'rounded'
  }
}

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Avatar src='https://i.pravatar.cc/150?img=1' size='sm' alt='Small avatar' />
      <Avatar src='https://i.pravatar.cc/150?img=2' size='md' alt='Medium avatar' />
      <Avatar src='https://i.pravatar.cc/150?img=3' size='lg' alt='Large avatar' />
      <Avatar src='https://i.pravatar.cc/150?img=4' size='xl' alt='Extra large avatar' />
    </div>
  )
}

export const Variants: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Avatar src='https://i.pravatar.cc/150?img=5' variant='rounded' alt='Rounded avatar' />
      <Avatar src='https://i.pravatar.cc/150?img=6' variant='square' alt='Square avatar' />
    </div>
  )
}

export const WithFallback: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Avatar
        src='https://invalid-url.com/image.jpg'
        alt='User avatar'
        size='lg'
        fallback={
          <div className='size-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold'>
            JD
          </div>
        }
      />
      <Avatar
        alt='User avatar'
        size='lg'
        fallback={
          <div className='size-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold'>
            AB
          </div>
        }
      />
    </div>
  )
}

export const MultipleAvatars: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      {[1, 2, 3, 4, 5].map((num) => (
        <Avatar key={num} src={`https://i.pravatar.cc/150?img=${num}`} size='md' alt={`Avatar ${num}`} />
      ))}
    </div>
  )
}
