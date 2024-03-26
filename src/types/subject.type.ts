import { User } from './user.type'

export interface UserSubjectResponse {
    message: string
    data: UserSubject[]
}

interface UserSubject {
    _id: string
    user_id: User
    subject_id: string
}

export interface Subject {
    _id: string
    name: string
    description: string
}
export interface SubjectResponse {
    message: string
    data: Subject[]
}
