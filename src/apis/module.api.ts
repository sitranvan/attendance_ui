import {
    AddUserToModuleResponse,
    CheckUserInModuleResponse,
    GetUserByModuleResponse,
    ModuleResponse,
} from '~/types/module.type'
import http from '~/utils/http'

const moduleApi = {
    getAllModule: () => {
        return http.get<ModuleResponse>('/modules')
    },
    createModule: (body: { name: string }) => {
        return http.post<ModuleResponse>('/modules/create', body)
    },
    addUserToModule: (body: { module_id: string; user_id: string }) => {
        return http.post<AddUserToModuleResponse>('/modules/users/create', body)
    },
    getUserByModule: (module_id: string) => {
        return http.get<GetUserByModuleResponse>(`/modules/${module_id}/users`)
    },
    checkUserInModule: (body: { module_id: string; user_id: string }) => {
        return http.post<CheckUserInModuleResponse>('/modules/check/check', body)
    },
}
export default moduleApi
