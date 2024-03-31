import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import pathRouter from '~/constants/path'
import { AppContext } from '~/contexts/app.context'

export const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AppContext)

    return isAuthenticated ? <Outlet /> : <Navigate to={pathRouter.login} />
}
export const RejectedRoute = () => {
    const { isAuthenticated } = useContext(AppContext)

    return !isAuthenticated ? <Outlet /> : <Navigate to={pathRouter.dashboard} />
}
