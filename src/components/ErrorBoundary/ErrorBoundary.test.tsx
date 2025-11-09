import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it, vi, beforeEach } from 'vitest'
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

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.mocked(useRouteError).mockReturnValue(new Error('Test error'))
    vi.mocked(isRouteErrorResponse).mockReturnValue(false)
  })

  it('renders default error message', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <ErrorBoundary />
        }
      ],
      { initialEntries: ['/'] }
    )

    render(<RouterProvider router={router} />)
    expect(screen.getByText('Đã xảy ra lỗi.')).toBeInTheDocument()
  })

  it('displays 404 message for 404 error', () => {
    const error = { status: 404, statusText: 'Not Found', data: null }
    vi.mocked(isRouteErrorResponse).mockReturnValue(true)
    vi.mocked(useRouteError).mockReturnValue(error as any)

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <ErrorBoundary />
        }
      ],
      { initialEntries: ['/'] }
    )

    render(<RouterProvider router={router} />)
    expect(screen.getByText('Không tìm thấy trang.')).toBeInTheDocument()
  })

  it('displays 500 message for 500 error', () => {
    const error = { status: 500, statusText: 'Internal Server Error', data: null }
    vi.mocked(isRouteErrorResponse).mockReturnValue(true)
    vi.mocked(useRouteError).mockReturnValue(error as any)

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <ErrorBoundary />
        }
      ],
      { initialEntries: ['/'] }
    )

    render(<RouterProvider router={router} />)
    expect(screen.getByText('Lỗi máy chủ nội bộ.')).toBeInTheDocument()
  })

  it('displays error message from Error object', () => {
    const error = new Error('Custom error message')
    vi.mocked(useRouteError).mockReturnValue(error)

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <ErrorBoundary />
        }
      ],
      { initialEntries: ['/'] }
    )

    render(<RouterProvider router={router} />)
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('renders link to home page', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <ErrorBoundary />
        }
      ],
      { initialEntries: ['/'] }
    )

    render(<RouterProvider router={router} />)
    const link = screen.getByRole('link', { name: /quay lại trang chủ/i })
    expect(link).toHaveAttribute('href', '/')
  })
})
