import type { Meta, StoryObj } from '@storybook/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppContext } from '@/contexts'
import Header from './Header'
import type { User } from '@/types'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The main header component with search, cart, and navigation. Note: Requires i18n, React Query, and services setup for full functionality.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false
          }
        }
      })

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
              <QueryClientProvider client={queryClient}>
                <AppContext.Provider value={contextValue}>
                  <Story />
                </AppContext.Provider>
              </QueryClientProvider>
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
type Story = StoryObj<typeof Header>

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
