import { ScheduleResponse } from '~/types/schedule.type'
import http from '~/utils/http'

export const getScheduleApi = (userId: string) => http.get<ScheduleResponse>(`/schedules/${userId}`)
