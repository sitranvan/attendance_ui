import {
    AttendanceByIdResponse,
    AttendanceDetailByUserResponse,
    AttendanceDetailResponse,
    AttendanceResponse,
    AttendanceUserShiftResponse,
    CreateAttendanceResponse,
} from '~/types/attendance.type'
import { MessageResponse } from '~/types/utils.type'
import http from '~/utils/http'

const attendanceApi = {
    getAllAttendance: () => {
        return http.get<AttendanceResponse>('/attendances')
    },
    getAttendanceById: (attendance_id: string) => {
        return http.get<AttendanceByIdResponse>(`/attendances/${attendance_id}/info`)
    },
    scanerAttendance: (body: { attendance_id: string; user_id: string }) => {
        return http.post<MessageResponse>('/attendances/users/create', body)
    },
    getAttendanceUserShift: (attendance_id: string) => {
        return http.get<AttendanceUserShiftResponse>(`/attendances/${attendance_id}/users/shift`)
    },
    getAttendanceDetail: (attendance_id: string) => {
        return http.get<AttendanceDetailResponse>(`/attendances/${attendance_id}/users`)
    },
    getAttendanceDetailByUser: (attendance_id: string, user_id: string) => {
        return http.get<AttendanceDetailByUserResponse>(`/attendances/${attendance_id}/${user_id}/users`)
    },
    editNoteAttendance: (body: { note: string; attendance_id: string; user_id: string }) => {
        return http.put<MessageResponse>('/attendances/note', body)
    },
    deleteAttendanceDetail: (attendance_id: string, user_id: string) => {
        return http.delete<AttendanceDetailByUserResponse>(`/attendances/${attendance_id}/${user_id}/users`)
    },
    createAttendance: (body: { shift_id: string; user_id: string; module_id: string }) => {
        return http.post<CreateAttendanceResponse>('/attendances/create', body)
    },
}

export default attendanceApi
