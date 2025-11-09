import { isAxiosUnprocessableEntityError } from '@/utils/axiosError'
import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { describe, it, expect } from 'vitest'

// describe is used to describe a set of contexts
// or a unit to be tested: For example, a function or a component
describe('isAxiosError', () => {
  // it is used to note the case that needs to be tested.
  it('isAxiosError return boolean', () => {
    // expect is used to expect a return value
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  it('isAxiosUnprocessableEntityError return boolean', () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true)
  })
})
