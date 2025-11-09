import {
  clearLocalStorage,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
  saveRefreshTokenToLocalStorage
} from '@/utils/auth'
import { beforeEach, describe, expect, it } from 'vitest'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTNjYjdhYTcyYjRhZGQ5YWQzNDI1YyIsImVtYWlsIjoibGluaEB5b3BtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjUtMTEtMDJUMTI6NTI6MTkuODAwWiIsImlhdCI6MTc2MjA4NzkzOSwiZXhwIjoxNzYyMDg4ODM5fQ.YiIMq5ceUfofqZZnTCFNYEc0Jy_omqwFP9_uEMI2AYQ'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTNjYjdhYTcyYjRhZGQ5YWQzNDI1YyIsImVtYWlsIjoibGluaEB5b3BtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjUtMTEtMDJUMTI6NTI6MTkuODAwWiIsImlhdCI6MTc2MjA4NzkzOSwiZXhwIjoxNzYyMDkxNTM5fQ.ytBeii_HdmfEsIFj1XuXGdk5tuR_R5sl5BTInJ2mSTo'

describe('Token storage functions', () => {
  beforeEach(() => {
    clearLocalStorage()
  })

  it('saves and retrieves access_token correctly', () => {
    saveAccessTokenToLocalStorage(access_token)
    expect(getAccessTokenFromLocalStorage()).toBe(access_token)
  })

  it('saves and retrieves refresh_token correctly', () => {
    saveRefreshTokenToLocalStorage(refresh_token)
    expect(getRefreshTokenFromLocalStorage()).toBe(refresh_token)
  })
})

describe('clear local storage', () => {
  it('Remove all the authentication and authorization data', () => {
    saveAccessTokenToLocalStorage(access_token)
    saveRefreshTokenToLocalStorage(refresh_token)
    clearLocalStorage()
    expect(getAccessTokenFromLocalStorage()).toBe('')
    expect(getRefreshTokenFromLocalStorage()).toBe('')
  })
})
