import { ScheduleResponse } from '~/types/schedule.type'
import http from '~/utils/http'

export const getAttendanceByScheduleIdApi = (ScheduleId: string) =>
    http.get<ScheduleResponse>(`/attendances/${ScheduleId}/schedule`)
export const createAttendanceDetailApi = (body: { attendance_id: string; user_id: string }) =>
    http.post('/attendances/create', body)

export const getAttendanceDetailByAttendanceIdApi = (attendanceId: string) =>
    http.get(`/attendances/${attendanceId}/students`)
