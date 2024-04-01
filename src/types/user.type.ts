import { Class } from './class.type'
import { Level } from './level.type'
import { Major } from './major.type'
import { Role } from './role.type'
import { SuccessResponse } from './utils.type'

export interface User {
    _id: string
    name: string
    fullname: string
    code: string
    gender: boolean
    email: string
    address: string
    avatar: string
    qr_code: string
    role: string
    level: string
    major: string
    class: string
    role_info: Role
    level_info: Level
    major_info: Major
    class_info: Class
}

export type UserResponse = SuccessResponse<User[]>
