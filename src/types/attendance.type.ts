import { Module } from './module.type'
import { Shift } from './shift.type'
import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export interface Attendance {
    _id: string
    user_id: User
    shift_id: Shift
    module_id: Module
}

export interface AttendanceUserShift {
    _id: string
    user_id: User
    module_id: Module
}

export interface AttendanceDetail {
    _id: string
    attendance_id: string
    user_id: User
    note: string
    status: string
    createdAt: string
    updatedAt: string
}

export type AttendanceResponse = SuccessResponse<Attendance[]>
export type AttendanceByIdResponse = SuccessResponse<Attendance>
export type AttendanceUserShiftResponse = SuccessResponse<AttendanceUserShift[]>
export type AttendanceDetailResponse = SuccessResponse<AttendanceDetail[]>
export type AttendanceDetailByUserResponse = SuccessResponse<AttendanceDetail>
