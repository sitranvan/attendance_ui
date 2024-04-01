import { SuccessResponse } from './utils.type'

export interface Major {
    _id: string
    name: string
    description: string
}

export type MajorResponse = SuccessResponse<Major[]>
