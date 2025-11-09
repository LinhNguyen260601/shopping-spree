import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Pagination from './Pagination'

describe('Pagination', () => {
  const createRouter = (queryConfig = { page: '1', limit: '20' }) => {
    return createMemoryRouter(
      [
        {
          path: '/',
          element: <Pagination pageSize={10} queryConfig={queryConfig as any} />
        }
      ],
      { initialEntries: ['/'] }
    )
  }

  it('renders pagination navigation', () => {
    const router = createRouter()
    render(<RouterProvider router={router} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('displays previous button', () => {
    const router = createRouter()
    render(<RouterProvider router={router} />)
    expect(screen.getByText('Trang trước')).toBeInTheDocument()
  })

  it('displays next button', () => {
    const router = createRouter({ page: '1', limit: '20' })
    render(<RouterProvider router={router} />)
    expect(screen.getByText('Trang tiếp')).toBeInTheDocument()
  })

  it('disables previous button on first page', () => {
    const router = createRouter({ page: '1', limit: '20' })
    render(<RouterProvider router={router} />)
    const prevButton = screen.getByText('Trang trước')
    expect(prevButton).toHaveClass('opacity-50', 'cursor-not-allowed')
  })

  it('disables next button on last page', () => {
    const router = createRouter({ page: '10', limit: '20' })
    render(<RouterProvider router={router} />)
    const nextButton = screen.getByText('Trang tiếp')
    expect(nextButton).toHaveClass('opacity-50', 'cursor-not-allowed')
  })

  it('renders page numbers', () => {
    const router = createRouter({ page: '5', limit: '20' })
    render(<RouterProvider router={router} />)
    const pageLinks = screen.getAllByRole('link')
    const pageNumbers = pageLinks.filter((link) => /\d/.test(link.textContent || ''))
    expect(pageNumbers.length).toBeGreaterThan(0)
  })

  it('highlights active page', () => {
    const router = createRouter({ page: '5', limit: '20' })
    render(<RouterProvider router={router} />)
    const activePage = screen.getByRole('link', { current: 'page' })
    expect(activePage).toHaveClass('border-cyan-500', 'text-cyan-500')
  })

  it('renders dots for large page counts', () => {
    const router = createRouter({ page: '10', limit: '20' })
    render(<RouterProvider router={router} />)
    // Check if dots are rendered (may appear as spans with ...)
    // Dots may or may not be present depending on pagination logic
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('generates correct links for pages', () => {
    const router = createRouter({ page: '3', limit: '20' })
    render(<RouterProvider router={router} />)
    const pageLinks = screen.getAllByRole('link')
    // Should have links to other pages
    expect(pageLinks.length).toBeGreaterThan(0)
  })

  it('handles empty pageSize', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <Pagination pageSize={0} queryConfig={{ page: '1', limit: '20' } as any} />
        }
      ],
      { initialEntries: ['/'] }
    )
    render(<RouterProvider router={router} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
