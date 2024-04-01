import { useRoutes } from 'react-router-dom'
import pathRouter from '~/constants/path'
import DashboardLayout from '~/layouts/DashboardLayout'
import LoginLayout from '~/layouts/LoginLayout'
import DashboardHome from '~/pages/DashboardHome'
import Login from '~/pages/Login'

import { ProtectedRoute, RejectedRoute } from './roles.routes'

import Attendance from '~/pages/ManagerAttendance/ManagerAttendance'
import HistoryAttendance from '~/pages/ManagerAttendance/pages/HistoryAttendance'
import HistoryAttendanceDetail from '~/pages/ManagerAttendance/pages/HistoryAttendanceDetail'
import QRCode from '~/pages/ManagerAttendance/pages/QRCode'
import ManagerModule from '~/pages/ManagerModule'
import AddUserToModule from '~/pages/ManagerModule/pages/AddUserToModule'
import CreateModule from '~/pages/ManagerModule/pages/CreateModule'
import ManagerShift from '~/pages/ManagerShift'
import AddUserToShift from '~/pages/ManagerShift/pages/AddUserToShift'
import CreateShift from '~/pages/ManagerShift/pages/CreateShift'
import ManagerUser from '~/pages/ManagerUser/ManagerUser'
import CreateAccount from '~/pages/ManagerUser/pages/CreateAccount'

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
                    path: pathRouter.user,
                    element: (
                        <DashboardLayout>
                            <ManagerUser />
                        </DashboardLayout>
                    ),
                },
                {
                    path: pathRouter.user_create,
                    element: (
                        <DashboardLayout>
                            <CreateAccount />
                        </DashboardLayout>
                    ),
                },
                {
                    path: pathRouter.user_teacher,
                    element: (
                        <DashboardLayout>
                            <ManagerUser />
                        </DashboardLayout>
                    ),
                },
                {
                    path: pathRouter.user_teacher_create,
                    element: (
                        <DashboardLayout>
                            <CreateAccount />
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
                {
                    path: pathRouter.module_create,
                    element: (
                        <DashboardLayout>
                            <CreateModule />
                        </DashboardLayout>
                    ),
                },
                {
                    path: pathRouter.module_add_user,
                    element: (
                        <DashboardLayout>
                            <AddUserToModule />
                        </DashboardLayout>
                    ),
                },
                {
                    path: pathRouter.shift,
                    element: (
                        <DashboardLayout>
                            <ManagerShift />
                        </DashboardLayout>
                    ),
                },
                {
                    path: pathRouter.shift_create,
                    element: (
                        <DashboardLayout>
                            <CreateShift />
                        </DashboardLayout>
                    ),
                },
                {
                    path: pathRouter.shift_add_user,
                    element: (
                        <DashboardLayout>
                            <AddUserToShift />
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
