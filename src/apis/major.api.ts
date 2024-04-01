import { MajorResponse } from '~/types/major.type'
import http from '~/utils/http'

const majorApi = {
    getAllMajor: () => {
        return http.get<MajorResponse>('/majors')
    },
}
export default majorApi
