import { MessageResponse } from '~/types/utils.type'
import http from '~/utils/http'

export const scanerQRCodeApi = (body: { attendance_id: string; user_id: string; content: string }) =>
    http.post<MessageResponse>(`/scaners?content=${body.content}`, body)
