import { calculateDiscountPercentage } from '../caculate'
import { describe, expect, it } from 'vitest'

describe('calculateDiscountPercentage', () => {
  it('calculates discount percentage correctly', () => {
    const result = calculateDiscountPercentage(100, 80)
    expect(result).toBe('20%')
  })

  it('calculates discount percentage for 50% discount', () => {
    const result = calculateDiscountPercentage(200, 100)
    expect(result).toBe('50%')
  })

  it('handles 100% discount (free)', () => {
    const result = calculateDiscountPercentage(100, 0)
    expect(result).toBe('100%')
  })

  it('rounds discount percentage correctly', () => {
    const result = calculateDiscountPercentage(100, 83)
    expect(result).toBe('17%')
  })

  it('handles large numbers', () => {
    const result = calculateDiscountPercentage(1000, 750)
    expect(result).toBe('25%')
  })

  it('handles decimal prices and rounds correctly', () => {
    const result = calculateDiscountPercentage(99.99, 79.99)
    expect(result).toBe('20%')
  })

  it('returns 0% when prices are equal', () => {
    const result = calculateDiscountPercentage(100, 100)
    expect(result).toBe('0%')
  })
})

