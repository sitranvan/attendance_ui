import { SuccessResponse } from './utils.type'

export interface Role {
    _id: string
    name: string
    slug: string
    description: string
}
export type RoleResponse = SuccessResponse<Role[]>
