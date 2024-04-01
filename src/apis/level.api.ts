import { LevelResponse } from '~/types/level.type'
import http from '~/utils/http'

const levelApi = {
    getAllLevel: () => {
        return http.get<LevelResponse>('/levels')
    },
}
export default levelApi
