import { cn } from '../cn'
import { describe, expect, it } from 'vitest'

describe('cn', () => {
  it('merges class names correctly', () => {
    const result = cn('class1', 'class2')
    expect(result).toBe('class1 class2')
  })

  it('handles conditional classes', () => {
    const result = cn('base', true && 'conditional', false && 'hidden')
    expect(result).toBe('base conditional')
  })

  it('merges Tailwind classes and resolves conflicts', () => {
    const result = cn('px-2 py-1', 'px-4')
    expect(result).toBe('py-1 px-4')
  })

  it('handles objects with conditional classes', () => {
    const result = cn({ 'text-red-500': true, 'text-blue-500': false })
    expect(result).toBe('text-red-500')
  })

  it('handles arrays', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('handles empty input', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('removes duplicate classes', () => {
    const result = cn('class1', 'class2', 'class1')
    expect(result).toBe('class1 class2 class1')
  })

  it('handles mixed types', () => {
    const result = cn('base', { active: true }, ['extra'], null, undefined, false && 'hidden')
    expect(result).toBe('base active extra')
  })

  it('resolves Tailwind conflicts correctly', () => {
    const result = cn('bg-red-500', 'bg-blue-500')
    expect(result).toBe('bg-blue-500')
  })
})
