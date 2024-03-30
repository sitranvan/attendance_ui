import { useRoutes } from 'react-router-dom'
import DashboardLayout from '~/layouts/DashboardLayout'
import LoginLayout from '~/layouts/LoginLayout'
import DashboardHome from '~/pages/DashboardHome'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import { ProtectedRoute, RejectedRoute } from './roles.routes'
import pathRouter from '~/constants/path'

import QRCode from '~/pages/ManagerAttendance/pages/QRCode'
import ManagerStudent from '~/pages/ManagerStudent/ManagerStudent'
import HistoryAttendance from '~/pages/ManagerAttendance/pages/HistoryAttendance'
import Attendance from '~/pages/ManagerAttendance/ManagerAttendance'
import HistoryAttendanceDetail from '~/pages/ManagerAttendance/pages/HistoryAttendanceDetail'
import ManagerModule from '~/pages/ManagerModule'

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
                    path: pathRouter.attendance_qrcode,
                    element: (
                        <DashboardLayout>
                            <QRCode />
                        </DashboardLayout>
                    ),
                },
                {
                    path: pathRouter.attendance_history,
                    element: (
                        <DashboardLayout>
                            <HistoryAttendance />
                        </DashboardLayout>
                    ),
                },
                {
                    path: pathRouter.attendance_history_detail,
                    element: (
                        <DashboardLayout>
                            <HistoryAttendanceDetail />
                        </DashboardLayout>
                    ),
                },
                {
                    path: pathRouter.student,
                    element: (
                        <DashboardLayout>
                            <ManagerStudent />
                        </DashboardLayout>
                    ),
                },
                {
                    path: pathRouter.module,
                    element: (
                        <DashboardLayout>
                            <ManagerModule />
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
