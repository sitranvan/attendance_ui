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
export type ModuleResponse = SuccessResponse<Module[]>
export type AddUserToModuleResponse = SuccessResponse<AddUserToModule>
