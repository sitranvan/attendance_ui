import { UserResponse } from '~/types/user.type'
import http from '~/utils/http'

const userApi = {
    getAllUser: () => {
        return http.get<UserResponse>('/users')
    },
}
export default userApi
