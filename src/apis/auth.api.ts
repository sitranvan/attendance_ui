import { AuthResponse } from '~/types/auth.type'
import { MessageResponse } from '~/types/utils.type'
import http from '~/utils/http'

export const registerApi = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)
export const loginApi = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)
export const logoutApi = (body: { refresh_token: string }) => http.post<MessageResponse>('/logout', body)
