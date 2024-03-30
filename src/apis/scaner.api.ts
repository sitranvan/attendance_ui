import { MessageResponse } from '~/types/utils.type'
import http from '~/utils/http'

const scanerApi = {
    scaner: (body: { attendance_id: string; user_id: string }) => {
        return http.post<MessageResponse>('/scaners', body)
    },
}
export default scanerApi
