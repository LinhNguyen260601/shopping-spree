import { generateNameId } from '../generate'
import { describe, expect, it } from 'vitest'

describe('generateNameId', () => {
  it('generates nameId from name and id', () => {
    const result = generateNameId({ name: 'Product Name', id: '123' })
    expect(result).toBe('Product-Name-i.123')
  })

  it('removes special characters and replaces spaces with hyphens', () => {
    const result = generateNameId({ name: 'Product!@# Name', id: '456' })
    expect(result).toBe('Product-Name-i.456')
  })

  it('handles name with multiple spaces', () => {
    const result = generateNameId({ name: 'Very Long Product Name', id: '789' })
    expect(result).toBe('Very-Long-Product-Name-i.789')
  })

  it('handles empty name', () => {
    const result = generateNameId({ name: '', id: '123' })
    expect(result).toBe('-i.123')
  })

  it('handles alphanumeric id', () => {
    const result = generateNameId({ name: 'Product', id: 'abc123xyz' })
    expect(result).toBe('Product-i.abc123xyz')
  })

  it('removes all special characters before adding id', () => {
    const result = generateNameId({ name: 'Product!@#$%^&*()Name', id: '999' })
    expect(result).toBe('ProductName-i.999')
  })

  it('handles name with hyphens', () => {
    const result = generateNameId({ name: 'Product-Name', id: '111' })
    expect(result).toBe('ProductName-i.111')
  })
})
