import { RoleResponse } from '~/types/role.type'
import http from '~/utils/http'

const roleApi = {
    getAllRole: () => {
        return http.get<RoleResponse>('/roles')
    },
}
export default roleApi
