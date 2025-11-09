import type { ErrorResponse } from '@/types'
import axios, { AxiosError, HttpStatusCode } from 'axios'

/**
 * Type guard to check if an error is an AxiosError.
 * @param error - The error to check.
 * @returns True if the error is an AxiosError, false otherwise.
 */
export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => axios.isAxiosError(error)

/**
 * Type guard to check if an error is an AxiosError with status code 422.
 * @param error - The error to check.
 * @returns True if the error is an AxiosError with status code 422, false otherwise.
 */
export const isAxiosUnprocessableEntityError = <FormError>(error: unknown): error is AxiosError<FormError> =>
  isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity

/**
 * Type guard to check if an error is an AxiosError with status code 401.
 * @param error - The error to check.
 * @returns True if the error is an AxiosError with status code 401, false otherwise.
 */
export const isAxiosUnauthorizedError = <UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> =>
  isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized

export const isTokenExpired = <UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> =>
  isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
  error.response?.data.data?.name === 'EXPIRED_TOKEN'
