import { CheckAttendanceResponse } from '~/types/attendance.type'
import { AddUserToShiftResponse, CreateShiftResponse, ShiftResponse } from '~/types/shift.type'
import http from '~/utils/http'

const shiftApi = {
    getAllShift: () => {
        return http.get<ShiftResponse>('/shifts')
    },
    createShift: (body: { shift_time: string; shift_name: string; days_of_week: string }) => {
        return http.post<CreateShiftResponse>('/shifts/create', body)
    },
    addUserToShift: (body: { shift_id: string; user_id: string }[]) => {
        return http.post<AddUserToShiftResponse>('/shifts/users/create', body)
    },
    checkExistAttendance: (shift_id: string) => {
        return http.get<CheckAttendanceResponse>(`/shifts/${shift_id}/attendances`)
    },
}
export default shiftApi
