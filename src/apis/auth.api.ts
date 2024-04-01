import { FormDataAccount } from '~/pages/ManagerUser/pages/CreateAccount/CreateAccount'
import { AuthResponse } from '~/types/auth.type'
import { MessageResponse } from '~/types/utils.type'
import http from '~/utils/http'

const authApi = {
    createAccount: (body: FormDataAccount) => {
        return http.post<AuthResponse>('/register', body)
    },
    login: (body: { email: string; password: string }) => {
        return http.post<AuthResponse>('/login', body)
    },
    logout: (body: { refresh_token: string }) => {
        return http.post<MessageResponse>('/logout', body)
    },
}

export default authApi
