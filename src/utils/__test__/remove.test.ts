import { removeSpecialCharacter } from '../remove'
import { describe, expect, it } from 'vitest'

describe('removeSpecialCharacter', () => {
  it('removes all special characters from a string', () => {
    const input = 'Hello!@#$%^&*()World'
    const result = removeSpecialCharacter(input)
    expect(result).toBe('HelloWorld')
  })

  it('removes special characters including brackets and operators', () => {
    const input = 'test[<>]{}|\\'
    const result = removeSpecialCharacter(input)
    expect(result).toBe('test')
  })

  it('returns empty string when input contains only special characters', () => {
    const input = '!@#$%^&*()'
    const result = removeSpecialCharacter(input)
    expect(result).toBe('')
  })

  it('returns unchanged string when input contains no special characters', () => {
    const input = 'HelloWorld123'
    const result = removeSpecialCharacter(input)
    expect(result).toBe('HelloWorld123')
  })

  it('handles empty string', () => {
    const input = ''
    const result = removeSpecialCharacter(input)
    expect(result).toBe('')
  })

  it('removes special characters with spaces and keeps alphanumeric', () => {
    const input = 'Product Name 123!@#'
    const result = removeSpecialCharacter(input)
    expect(result).toBe('Product Name 123')
  })
})
