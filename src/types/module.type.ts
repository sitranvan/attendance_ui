import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export interface Module {
    _id: string
    name: string
    description: string
}

export interface AddUserToModule {
    _id: string
    user_id: string
    module_id: string
}

export interface GetUserByModule {
    _id: string
    module_id: string
    user_id: User
}
export type ModuleResponse = SuccessResponse<Module[]>
export type AddUserToModuleResponse = SuccessResponse<AddUserToModule>
export type CheckUserInModuleResponse = SuccessResponse<AddUserToModule>
export type GetUserByModuleResponse = SuccessResponse<GetUserByModule[]>
