import type { Meta, StoryObj } from '@storybook/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import Navbar from './Navbar'

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A navigation bar component for login/register pages.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const router = createMemoryRouter(
        [
          {
            path: '/',
            element: <Story />
          }
        ],
        { initialEntries: ['/'] }
      )
      return <RouterProvider router={router} />
    }
  ]
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Default: Story = {
  render: () => <Navbar />
}

