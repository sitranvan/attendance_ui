import { SuccessResponse } from './utils.type'

export interface Level {
    _id: string
    name: string
    description: string
}
export type LevelResponse = SuccessResponse<Level[]>
