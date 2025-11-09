export interface SuccessResponse<Data> {
  data: Data
  message: string
}

export interface ErrorResponse<Data> {
  data?: Data
  message: string
}

// -? syntax is used to remove the undefined type from the object
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
