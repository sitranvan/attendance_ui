import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined'
import { Button, Typography } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import attendanceApi from '~/apis/attendance.api'
import Breadcrumb from '~/components/Breadcrumb'
import { formatDate, isSameDay } from '~/utils/helpers'

export default function HistoryAttendance() {
    const { data: attendances } = useQuery({
        queryKey: ['getAllAttendance'],
        queryFn: () => attendanceApi.getAllAttendance(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        placeholderData: keepPreviousData,
    })

    // Chỉ lấy ra buổi điểm danh của ngày hiện tại
    const attendancesFilter = useMemo(() => {
        if (!attendances || !attendances.data || !attendances.data.data) return [] // Tránh lỗi khi dữ liệu không tồn tại
        return attendances.data.data.filter((attendance) => !isSameDay(attendance.shift_id.shift_time))
    }, [attendances])

    return (
        <div className=''>
            <Breadcrumb props_two='Điểm danh' />
            <div className='flex items-center gap-2'>
                <Typography color='grey' sx={{ textTransform: 'uppercase', mt: 1 }} fontSize='22px' variant='h2'>
                    Lịch sử
                </Typography>
                <ManageHistoryOutlinedIcon sx={{ mt: 0.5, color: 'grey' }} />
            </div>
            <table className='divide-y w-full divide-gray-200 dark:divide-gray-600 mt-6'>
                <thead className='bg-gray-100 dark:bg-gray-700 sticky top-0'>
                    <tr>
                        <th
                            scope='col'
                            className='w-[8%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            STT
                        </th>
                        <th
                            scope='col'
                            className='w-[20%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Giáo viên
                        </th>
                        <th
                            scope='col'
                            className='w-[25%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Tên môn học
                        </th>
                        <th
                            scope='col'
                            className='w-[20%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Ngày
                        </th>
                        <th
                            scope='col'
                            className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Ca học
                        </th>
                        <th
                            scope='col'
                            className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                    {attendancesFilter &&
                        attendancesFilter.map((item, index) => (
                            <tr key={index} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                                <td className='px-4 py-3  text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                    {index + 1}
                                </td>
                                <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                    <Button size='medium'>{item.user_id.fullname}</Button>
                                </td>
                                <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                    {item.module_id.name}
                                </td>
                                <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                    {formatDate(item.shift_id.shift_time)}
                                </td>
                                <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                    <Button size='medium' color='success'>
                                        {`${item.shift_id.days_of_week} - ${item.shift_id.shift_name}`}
                                    </Button>
                                </td>
                                <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                    <Link to={`/attendance/${item._id}/history`}>
                                        <Button size='medium' variant='contained'>
                                            Chi tiết
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
