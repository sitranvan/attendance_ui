import { useRoutes } from 'react-router-dom'
import DashboardLayout from '~/layouts/DashboardLayout'
import LoginLayout from '~/layouts/LoginLayout'
import DashboardHome from '~/pages/DashboardHome'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import { ProtectedRoute, RejectedRoute } from './roles.routes'
import pathRouter from '~/constants/path'
import Attendance from '~/pages/Attendance'
import QRCode from '~/pages/Attendance/pages/QRCode'

export default function useRoutesElement() {
    return useRoutes([
        {
            path: pathRouter.empty,
            element: <ProtectedRoute />,
            children: [
                {
                    path: pathRouter.dashboard,
                    element: (
                        <DashboardLayout>
                            <DashboardHome />
                        </DashboardLayout>
                    ),
                },
                {
                    path: pathRouter.attendance,
                    element: (
                        <DashboardLayout>
                            <Attendance />
                        </DashboardLayout>
                    ),
                },
                {
                    path: '/attendance/:id',
                    element: (
                        <DashboardLayout>
                            <QRCode />
                        </DashboardLayout>
                    ),
                },
            ],
        },
        {
            path: pathRouter.empty,
            element: <RejectedRoute />,
            children: [
                {
                    path: pathRouter.register,
                    element: (
                        <LoginLayout>
                            <Register />
                        </LoginLayout>
                    ),
                },
                {
                    path: pathRouter.login,
                    element: (
                        <LoginLayout>
                            <Login />
                        </LoginLayout>
                    ),
                },
            ],
        },
    ])
}
