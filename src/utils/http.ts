import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from '~/types/auth.type'
import {
    clearProfileFromLS,
    clearTokenFromLS,
    getAccessTokenFromLS,
    getRefreshTokenFromLS,
    saveProfileToLS,
    saveTokenToLS,
} from './auth'
import pathRouter from '~/constants/path'

class Http {
    instance: AxiosInstance
    private accessToken: string
    private refreshToken: string
    constructor() {
        this.accessToken = getAccessTokenFromLS()
        this.refreshToken = getRefreshTokenFromLS()
        this.instance = axios.create({
            baseURL: 'http://localhost:3000/api/v1/',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        // Header for authenticated requests
        this.instance.interceptors.request.use((config) => {
            if (this.accessToken) {
                config.headers.authorization = `Bearer ${this.accessToken}`
                return config
            }
            return config
        })
        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config
                if (url === pathRouter.login) {
                    this.accessToken = (response.data as AuthResponse).data.access_token
                    this.refreshToken = (response.data as AuthResponse).data.refresh_token
                    saveTokenToLS(this.accessToken, this.refreshToken)
                    saveProfileToLS((response.data as AuthResponse).data.user)
                } else if (url === pathRouter.logout) {
                    clearTokenFromLS()
                    clearProfileFromLS()
                }
                return response
            },
            (error: AxiosError) => {
                if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
                    const data: any | undefined = error.response?.data
                    const message = data?.message || error.message

                    toast.error(message)
                }
                return Promise.reject(error)
            },
        )
    }
}

const http = new Http().instance
export default http
