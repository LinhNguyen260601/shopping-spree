import { emailField, passwordField, passwordConfirmField } from '../schemas'
import { describe, expect, it } from 'vitest'

describe('emailField', () => {
  it('validates valid email', async () => {
    const schema = emailField()
    const result = await schema.validate('test@example.com')
    expect(result).toBe('test@example.com')
  })

  it('rejects invalid email format', async () => {
    const schema = emailField()
    await expect(schema.validate('invalid-email')).rejects.toThrow('Email không hợp lệ')
  })

  it('rejects empty email', async () => {
    const schema = emailField()
    await expect(schema.validate('')).rejects.toThrow('Email không được để trống')
  })

  it('rejects email shorter than 5 characters', async () => {
    const schema = emailField()
    await expect(schema.validate('a@c')).rejects.toThrow('Email phải có ít nhất 5 ký tự')
  })

  it('rejects email longer than 160 characters', async () => {
    const schema = emailField()
    const longEmail = 'a'.repeat(150) + '@example.com'
    await expect(schema.validate(longEmail)).rejects.toThrow('Email không được vượt quá 160 ký tự')
  })

  it('accepts email with exactly 5 characters', async () => {
    const schema = emailField()
    const result = await schema.validate('a@b.c')
    expect(result).toBe('a@b.c')
  })
})

describe('passwordField', () => {
  it('validates valid password', async () => {
    const schema = passwordField()
    const result = await schema.validate('password123')
    expect(result).toBe('password123')
  })

  it('rejects password shorter than 6 characters', async () => {
    const schema = passwordField()
    await expect(schema.validate('12345')).rejects.toThrow('Mật khẩu phải có ít nhất 6 ký tự')
  })

  it('rejects password longer than 160 characters', async () => {
    const schema = passwordField()
    const longPassword = 'a'.repeat(161)
    await expect(schema.validate(longPassword)).rejects.toThrow('Mật khẩu không được vượt quá 160 ký tự')
  })

  it('rejects empty password', async () => {
    const schema = passwordField()
    await expect(schema.validate('')).rejects.toThrow('Mật khẩu phải có ít nhất 6 ký tự')
  })

  it('accepts password with exactly 6 characters', async () => {
    const schema = passwordField()
    const result = await schema.validate('123456')
    expect(result).toBe('123456')
  })

  it('accepts password with exactly 160 characters', async () => {
    const schema = passwordField()
    const password = 'a'.repeat(160)
    const result = await schema.validate(password)
    expect(result).toBe(password)
  })
})

describe('passwordConfirmField', () => {
  it('validates password confirmation matching password', async () => {
    const schema = passwordConfirmField('password')
    const result = await schema.validate('password123', {
      parent: { password: 'password123' }
    } as any)
    expect(result).toBe('password123')
  })

  it('validates password confirmation matching new_password', async () => {
    const schema = passwordConfirmField('new_password')
    const result = await schema.validate('password123', {
      parent: { new_password: 'password123' }
    } as any)
    expect(result).toBe('password123')
  })

  it('rejects password confirmation not matching password', async () => {
    const schema = passwordConfirmField('password')
    const password = 'password123'
    const confirmPassword = 'differentpassword'
    await expect(
      schema.validate(confirmPassword, {
        parent: { password }
      } as any)
    ).rejects.toThrow('Mật khẩu không khớp')
  })

  it('rejects password confirmation shorter than 6 characters', async () => {
    const schema = passwordConfirmField('password')
    const password = 'password123'
    const context = { parent: { password } }
    await expect(schema.validate('12345', { context })).rejects.toThrow('Mật khẩu phải có ít nhất 6 ký tự')
  })

  it('rejects password confirmation longer than 160 characters', async () => {
    const schema = passwordConfirmField('password')
    const password = 'password123'
    const longPassword = 'a'.repeat(161)
    const context = { parent: { password } }
    await expect(schema.validate(longPassword, { context })).rejects.toThrow('Mật khẩu không được vượt quá 160 ký tự')
  })

  it('rejects empty password confirmation', async () => {
    const schema = passwordConfirmField('password')
    const password = 'password123'
    const context = { parent: { password } }
    await expect(schema.validate('', { context })).rejects.toThrow('Mật khẩu phải có ít nhất 6 ký tự')
  })
})
