import { SuccessResponse } from './utils.type'

export interface Class {
    _id: string
    name: string
    description: string
}

export type ClassResponse = SuccessResponse<Class[]>
