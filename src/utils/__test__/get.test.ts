import { getIdFromNameId } from '../get'
import { describe, expect, it } from 'vitest'

describe('getIdFromNameId', () => {
  it('extracts id from nameId with standard format', () => {
    const nameId = 'product-name-i.12345'
    const result = getIdFromNameId(nameId)
    expect(result).toBe('12345')
  })

  it('extracts id when nameId has multiple separators', () => {
    const nameId = 'very-long-product-name-i.67890'
    const result = getIdFromNameId(nameId)
    expect(result).toBe('67890')
  })

  it('returns the last segment after -i. separator', () => {
    const nameId = 'name-i.111-i.222'
    const result = getIdFromNameId(nameId)
    expect(result).toBe('222')
  })

  it('handles nameId with only id part', () => {
    const nameId = '-i.999'
    const result = getIdFromNameId(nameId)
    expect(result).toBe('999')
  })

  it('handles empty id segment', () => {
    const nameId = 'product-i.'
    const result = getIdFromNameId(nameId)
    expect(result).toBe('')
  })

  it('handles alphanumeric id', () => {
    const nameId = 'product-name-i.abc123xyz'
    const result = getIdFromNameId(nameId)
    expect(result).toBe('abc123xyz')
  })
})

