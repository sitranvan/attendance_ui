const pathRouter = {
    empty: '',
    dashboard: '/dashboard',
    login: '/login',
    register: '/register',
    logout: '/logout',
    attendance: '/attendance/today',
    attendance_qrcode: '/attendance/:id/today',
    attendance_history: '/attendance/history',
    attendance_history_detail: '/attendance/:id/history',
    student: '/student',
    module: '/module',
    module_create: '/module/create',
    module_add_user: '/module/:id/user',
    shift: '/shift',
    shift_create: '/shift/create',
    shift_add_user: '/shift/:id/user',
}
export default pathRouter
