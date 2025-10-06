import axios, { AxiosError, HttpStatusCode } from 'axios'

/**
 * Type guard to check if an error is an AxiosError.
 * @param error - The error to check.
 * @returns True if the error is an AxiosError, false otherwise.
 */
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

/**
 * Type guard to check if an error is an AxiosError with status code 422.
 * @param error - The error to check.
 * @returns True if the error is an AxiosError with status code 422, false otherwise.
 */
export const isAxiosUnprocessableEntityError = <FormError>(error: unknown): error is AxiosError<FormError> =>
  isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
