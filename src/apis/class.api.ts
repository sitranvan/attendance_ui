import { ClassResponse } from '~/types/class.type'
import http from '~/utils/http'

const classApi = {
    getAllClass: () => {
        return http.get<ClassResponse>('/classes')
    },
}
export default classApi
