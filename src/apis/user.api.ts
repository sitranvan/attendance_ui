import { UserResponse } from '~/types/user.type'
import http from '~/utils/http'

const userApi = {
    getAllUser: () => {
        return http.get<UserResponse>('/users')
    },
    getAllAdmin: () => {
        return http.get<UserResponse>('/admin')
    },
    getFullUser: () => {
        return http.get<UserResponse>('/full')
    },
}
export default userApi
