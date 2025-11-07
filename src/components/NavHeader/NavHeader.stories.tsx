import type { Meta, StoryObj } from '@storybook/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { AppContext } from '@/contexts'
import NavHeader from './NavHeader'
import type { User } from '@/types'

const meta: Meta<typeof NavHeader> = {
  title: 'Components/NavHeader',
  component: NavHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A navigation header component with language selection and user menu. Note: Requires i18n and React Query setup for full functionality.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const mockUser: User = {
        _id: '1',
        roles: ['User'],
        email: 'user@example.com',
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const args = context.args as { isAuthenticated?: boolean }
      const isAuthenticated = args?.isAuthenticated || false

      const contextValue = {
        isAuthenticated,
        setIsAuthenticated: () => {},
        user: isAuthenticated ? mockUser : null,
        setUser: () => {},
        extendedPurchases: [],
        setExtendedPurchases: () => {},
        reset: () => {}
      }

      const router = createMemoryRouter(
        [
          {
            path: '/',
            element: (
              <AppContext.Provider value={contextValue}>
                <div className='bg-orange-500 text-white p-4'>
                  <Story />
                </div>
              </AppContext.Provider>
            )
          }
        ],
        { initialEntries: ['/'] }
      )
      return <RouterProvider router={router} />
    }
  ],
  argTypes: {
    isAuthenticated: {
      control: 'boolean',
      description: 'User authentication status'
    }
  }
}

export default meta
type Story = StoryObj<typeof NavHeader>

export const NotAuthenticated: Story = {
  args: {
    isAuthenticated: false
  }
}

export const Authenticated: Story = {
  args: {
    isAuthenticated: true
  }
}

