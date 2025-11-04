import { formatCurrency, formatNumberToSocialStyle } from '../format'
import { describe, expect, it } from 'vitest'

describe('formatCurrency', () => {
  it('formats currency with default locale (de-DE)', () => {
    const result = formatCurrency(1234567.89)
    expect(result).toBe('1.234.567,89')
  })

  it('formats currency with custom locale', () => {
    const result = formatCurrency(1234567.89, 'en-US')
    expect(result).toBe('1,234,567.89')
  })

  it('formats currency with options', () => {
    const result = formatCurrency(1234.56, 'en-US', { style: 'currency', currency: 'USD' })
    expect(result).toContain('$')
    expect(result).toContain('1,234.56')
  })

  it('handles zero', () => {
    const result = formatCurrency(0)
    expect(result).toBe('0')
  })

  it('handles negative numbers', () => {
    const result = formatCurrency(-1234.56)
    expect(result).toBe('-1.234,56')
  })

  it('handles large numbers', () => {
    const result = formatCurrency(999999999.99)
    expect(result).toBe('999.999.999,99')
  })
})

describe('formatNumberToSocialStyle', () => {
  it('formats numbers in compact notation', () => {
    const result = formatNumberToSocialStyle(1000)
    expect(result).toBe('1k')
  })

  it('formats millions correctly', () => {
    const result = formatNumberToSocialStyle(1500000)
    expect(result).toBe('1,5m')
  })

  it('formats billions correctly', () => {
    const result = formatNumberToSocialStyle(2500000000)
    expect(result).toBe('2,5b')
  })

  it('formats numbers less than 1000', () => {
    const result = formatNumberToSocialStyle(500)
    expect(result).toBe('500')
  })

  it('handles decimal compact notation', () => {
    const result = formatNumberToSocialStyle(1234)
    expect(result).toBe('1,2k')
  })

  it('converts dot to comma and lowercase', () => {
    const result = formatNumberToSocialStyle(1500000)
    expect(result).toBe('1,5m')
  })

  it('handles zero', () => {
    const result = formatNumberToSocialStyle(0)
    expect(result).toBe('0')
  })

  it('handles very large numbers', () => {
    const result = formatNumberToSocialStyle(1000000000)
    expect(result).toBe('1b')
  })
})

