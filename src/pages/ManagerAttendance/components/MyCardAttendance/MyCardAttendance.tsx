import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import pathRouter from '~/constants/path'
import { Attendance } from '~/types/attendance.type'
import { formatDate } from '~/utils/helpers'

interface MyCardAttendanceProps {
    attendances?: Attendance[]
}

export default function MyCardAttendance({ attendances }: MyCardAttendanceProps) {
    // const studentCount = useMemo(() => attendances?.length, [attendances])
    return (
        <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-4'>
            {attendances?.map((attendance) => (
                <div key={attendance._id} className='max-w-sm p-6 bg-white rounded-md border border-green-500 shadow '>
                    <div className='flex gap-1 items-center mb-3 text-pink-600'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-7 h-7'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                            />
                        </svg>
                        <Typography>
                            {formatDate(attendance.shift_id.shift_time)} <br /> {attendance.shift_id.days_of_week} -{' '}
                            {attendance.shift_id.shift_name}
                        </Typography>
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex items-center mb-3 gap-2'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-7 h-7 text-gray-500 dark:text-gray-400'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5'
                                />
                            </svg>

                            <span className='font-medium text-sm text-gray-500'>GV: {attendance.user_id.fullname}</span>
                        </div>
                        {/* <div className='flex items-center mb-3 gap-2'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6 text-gray-500 dark:text-gray-400'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z'
                                />
                            </svg>

                            <span className='font-medium text-sm text-gray-500'>{} Sinh viên</span>
                        </div> */}
                    </div>
                    <Typography sx={{ mb: 1.5 }} variant='h5'>
                        {attendance.module_id.name}
                    </Typography>

                    <Typography mb={2}>{attendance.module_id.description}</Typography>

                    <Link
                        to={`${pathRouter.attendance_qrcode.replace(':id', attendance._id)}`}
                        className='inline-flex font-medium items-center text-blue-600 hover:underline'
                    >
                        Điểm danh sinh viên
                        <svg
                            className='w-3 h-3 ms-2.5 rtl:rotate-[270deg]'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 18 18'
                        >
                            <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778'
                            />
                        </svg>
                    </Link>
                </div>
            ))}
        </div>
    )
}
