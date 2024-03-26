import { User } from '~/types/user.type'

export const saveTokenToLS = (access_token: string, refresh_token: string) => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
}
export const getAccessTokenFromLS = () => {
    return localStorage.getItem('access_token') || ''
}

export const getRefreshTokenFromLS = () => {
    return localStorage.getItem('refresh_token') || ''
}

export const clearTokenFromLS = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}

export const getProfileFromLS = () => {
    const profile = localStorage.getItem('profile')
    if (profile) {
        return JSON.parse(profile)
    }
    return null
}

export const saveProfileToLS = (profile: User) => {
    localStorage.setItem('profile', JSON.stringify(profile))
}

export const clearProfileFromLS = () => {
    localStorage.removeItem('profile')
}
