import { Subject } from './subject.type'

export interface Schedule {
    user_id: string
    subject_id: Subject
    session: number
    date: string
    _id: string
}

export interface ScheduleResponse {
    message: string
    data: Schedule[]
}
