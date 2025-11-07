import type { Meta, StoryObj } from '@storybook/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { vi } from 'vitest'
import ErrorBoundary from './ErrorBoundary'
import * as router from 'react-router-dom'

// Mock useRouteError
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useRouteError: vi.fn(),
    isRouteErrorResponse: vi.fn()
  }
})

const useRouteError = vi.mocked(router.useRouteError)
const isRouteErrorResponse = vi.mocked(router.isRouteErrorResponse)

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'An error boundary component that displays error messages for different error types.'
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
type Story = StoryObj<typeof ErrorBoundary>

export const DefaultError: Story = {
  render: () => {
    useRouteError.mockReturnValue(new Error('Test error'))
    isRouteErrorResponse.mockReturnValue(false)
    return <ErrorBoundary />
  }
}

export const NotFoundError: Story = {
  render: () => {
    const error = { status: 404, statusText: 'Not Found', data: null }
    isRouteErrorResponse.mockReturnValue(true)
    useRouteError.mockReturnValue(error as any)
    return <ErrorBoundary />
  }
}

export const ServerError: Story = {
  render: () => {
    const error = { status: 500, statusText: 'Internal Server Error', data: null }
    isRouteErrorResponse.mockReturnValue(true)
    useRouteError.mockReturnValue(error as any)
    return <ErrorBoundary />
  }
}

export const CustomErrorMessage: Story = {
  render: () => {
    const error = new Error('Custom error message')
    useRouteError.mockReturnValue(error)
    isRouteErrorResponse.mockReturnValue(false)
    return <ErrorBoundary />
  }
}
