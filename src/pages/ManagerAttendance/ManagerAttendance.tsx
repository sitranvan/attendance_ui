import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import { Typography } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import attendanceApi from '~/apis/attendance.api'
import Breadcrumb from '~/components/Breadcrumb'
import { isSameDay } from '~/utils/helpers'
import MyCardAttendance from './components/MyCardAttendance/MyCardAttendance'

export default function ManagerAttendance() {
    const { data: attendances } = useQuery({
        queryKey: ['getAllAttendance'],
        queryFn: () => attendanceApi.getAllAttendance(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        placeholderData: keepPreviousData,
    })

    // Chỉ lấy ra buổi điểm danh của ngày hiện tại
    const attendancesFilter = useMemo(() => {
        if (!attendances || !attendances.data || !attendances.data.data) return [] // Tránh lỗi khi dữ liệu không tồn tại
        return attendances.data.data.filter((attendance) => isSameDay(attendance.shift_id.shift_time))
    }, [attendances])

    return (
        <div>
            <Breadcrumb props_two='Điểm danh hôm nay' />
            <div className='flex items-end gap-2'>
                <Typography color='grey' sx={{ textTransform: 'uppercase', mt: 2 }} fontSize='22px' variant='h2'>
                    Điểm danh hôm nay
                </Typography>
                <PlaylistAddCheckIcon sx={{ color: 'grey' }} />
            </div>
            <div className='flex items-start gap-4 mt-6'>
                <MyCardAttendance attendances={attendancesFilter} />
            </div>
        </div>
    )
}
