import axios, { AxiosError, HttpStatusCode } from 'axios'

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => axios.isAxiosError(error)

// Error 422
export const isAxiosUnprocessableEntity = <FormError>(error: unknown): error is AxiosError<FormError> =>
    isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
