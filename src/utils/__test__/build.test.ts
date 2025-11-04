import { PATH } from '@/constants'
import type { QueryConfig } from '@/pages/ProductList/types'
import { buildLinkWithUpdatedQuery } from '../build'
import { describe, expect, it } from 'vitest'

describe('buildLinkWithUpdatedQuery', () => {
  const mockQueryConfig: QueryConfig = {
    page: '1',
    limit: '20',
    sort_by: 'createdAt',
    order: 'desc'
  }

  it('updates a single field with value', () => {
    const result = buildLinkWithUpdatedQuery(mockQueryConfig, 'page', '2')
    expect(result.pathname).toBe(PATH.HOME)
    expect(result.search).toBe('page=2&limit=20&sort_by=createdAt&order=desc')
  })

  it('updates multiple fields using object', () => {
    const result = buildLinkWithUpdatedQuery(mockQueryConfig, { page: '3', limit: '30' })
    expect(result.pathname).toBe(PATH.HOME)
    expect(result.search).toContain('page=3')
    expect(result.search).toContain('limit=30')
  })

  it('uses custom path when provided', () => {
    const customPath = '/products'
    const result = buildLinkWithUpdatedQuery(mockQueryConfig, 'page', '2', customPath)
    expect(result.pathname).toBe(customPath)
  })

  it('converts number values to strings', () => {
    const result = buildLinkWithUpdatedQuery(mockQueryConfig, { page: 5, limit: 50 })
    expect(result.search).toContain('page=5')
    expect(result.search).toContain('limit=50')
  })

  it('merges updates with existing query config', () => {
    const result = buildLinkWithUpdatedQuery(mockQueryConfig, { page: '2' })
    expect(result.search).toContain('page=2')
    expect(result.search).toContain('limit=20')
    expect(result.search).toContain('sort_by=createdAt')
    expect(result.search).toContain('order=desc')
  })

  it('overwrites existing fields when updated', () => {
    const result = buildLinkWithUpdatedQuery(mockQueryConfig, { page: '5', sort_by: 'price' })
    expect(result.search).toContain('page=5')
    expect(result.search).toContain('sort_by=price')
    expect(result.search).not.toContain('sort_by=createdAt')
  })

  it('handles empty query config', () => {
    const emptyConfig: QueryConfig = {}
    const result = buildLinkWithUpdatedQuery(emptyConfig, 'page', '1')
    expect(result.search).toBe('page=1')
  })

  it('handles price filters', () => {
    const result = buildLinkWithUpdatedQuery(mockQueryConfig, { price_min: 100, price_max: 500 })
    expect(result.search).toContain('price_min=100')
    expect(result.search).toContain('price_max=500')
  })

  it('handles category filter', () => {
    const result = buildLinkWithUpdatedQuery(mockQueryConfig, 'category', 'electronics')
    expect(result.search).toContain('category=electronics')
  })

  it('handles name filter', () => {
    const result = buildLinkWithUpdatedQuery(mockQueryConfig, 'name', 'laptop')
    expect(result.search).toContain('name=laptop')
  })

  it('handles rating filter', () => {
    const result = buildLinkWithUpdatedQuery(mockQueryConfig, 'rating_filter', 4)
    expect(result.search).toContain('rating_filter=4')
  })

  it('preserves all original fields when only updating one', () => {
    const fullConfig: QueryConfig = {
      page: '1',
      limit: '20',
      sort_by: 'price',
      order: 'asc',
      category: 'electronics',
      name: 'laptop'
    }
    const result = buildLinkWithUpdatedQuery(fullConfig, 'page', '2')
    expect(result.search).toContain('page=2')
    expect(result.search).toContain('limit=20')
    expect(result.search).toContain('sort_by=price')
    expect(result.search).toContain('order=asc')
    expect(result.search).toContain('category=electronics')
    expect(result.search).toContain('name=laptop')
  })
})

