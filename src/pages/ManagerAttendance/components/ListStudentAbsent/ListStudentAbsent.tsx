import { Button } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import attendanceApi from '~/apis/attendance.api'
import { queryClient } from '~/main'
import UploadFileIcon from '@mui/icons-material/UploadFile'

import { User } from '~/types/user.type'

interface ListStudentAbsentProps {
    listAbsent: User[]
}

export default function ListStudentAbsent({ listAbsent }: ListStudentAbsentProps) {
    const { id: attendance_id } = useParams<{ id: string }>()

    const scanerMutation = useMutation({
        mutationFn: (body: { attendance_id: string; user_id: string }) => attendanceApi.scanerAttendance(body),
    })

    const handleAttendance = (user_id: string) => {
        const body = {
            attendance_id: attendance_id as string,
            user_id,
        }
        scanerMutation.mutate(body, {
            onSuccess() {
                toast.success('Điểm danh thành công')
                queryClient.invalidateQueries({ queryKey: ['attendanceDetail', attendance_id] })
            },
        })
    }

    function exportToExcel() {
        const ws = XLSX.utils.json_to_sheet(
            listAbsent.map((user, index) => ({
                STT: index + 1,
                MSSV: user.code,
                'Họ Và Tên': user.fullname,
                Lớp: 'D20_TH03',
            })),
        )
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
        XLSX.writeFile(wb, 'C:\\Users\\tranvansi\\Downloads\\danhsachvangmat.xlsx')
    }
    return (
        // <div className='overflow-auto h-[420px]'>
        <div>
            <table className='divide-y w-full divide-gray-200 dark:divide-gray-600'>
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
                            className='w-[25%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            MSSV
                        </th>
                        <th
                            scope='col'
                            className='w-[25%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Họ Và Tên
                        </th>
                        <th
                            scope='col'
                            className='w-[20%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Lớp
                        </th>
                        <th
                            scope='col'
                            className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Thao Tác
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                    {listAbsent &&
                        listAbsent.map((user, index) => (
                            <tr key={user._id} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                                <td className='px-4 py-3  text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                    {index + 1}
                                </td>
                                <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                    <Button size='medium'>{user.code}</Button>
                                </td>
                                <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                    {user.fullname}
                                </td>
                                <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                    <Button size='medium' color='warning' variant='outlined'>
                                        D20_TH03
                                    </Button>
                                </td>
                                <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                    <Button
                                        onClick={() => handleAttendance(user._id)}
                                        size='medium'
                                        color='success'
                                        variant='contained'
                                    >
                                        Điểm Danh
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className='flex justify-end'>
                <Button
                    endIcon={<UploadFileIcon />}
                    size='large'
                    color='info'
                    variant='contained'
                    sx={{ mt: 4, textAlign: 'right' }}
                    onClick={exportToExcel}
                >
                    Xuất File Excel
                </Button>
            </div>
        </div>
    )
}
