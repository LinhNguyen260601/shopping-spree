import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Dọn dẹp DOM sau mỗi test
afterEach(() => {
  cleanup()
})
