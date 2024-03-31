import { SuccessResponse } from './utils.type'

export interface Shift {
    _id: string
    shift_time: string
    shift_name: string
    days_of_week: string
}
export interface AddUserToShift {
    _id: string
    user_id: string
    module_id: string
}

export type ShiftResponse = SuccessResponse<Shift[]>
export type CreateShiftResponse = SuccessResponse<Shift>
export type AddUserToShiftResponse = SuccessResponse<AddUserToShift>
