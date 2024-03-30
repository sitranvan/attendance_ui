import { useRef, useState } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import * as XLSX from 'xlsx'
import { Button } from '@mui/material'

import ModalNote from '../ModalNote'
import { useMutation } from '@tanstack/react-query'
import attendanceApi from '~/apis/attendance.api'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AttendanceDetail } from '~/types/attendance.type'
import { queryClient } from '~/main'
import { extractDateTimeFull } from '~/utils/helpers'

interface ListStudentScanerProps {
    listAttendanceDetail: AttendanceDetail[]
}
export default function ListStudentScaner({ listAttendanceDetail }: ListStudentScanerProps) {
    const [open, setOpen] = useState<boolean>(false)
    const userIdRef = useRef<string>('')
    const [dataNote, setDataNote] = useState<{ user_id: string; attendance_id: string }>({
        user_id: '',
        attendance_id: '',
    })
    const { id: attendance_id } = useParams<{ id: string }>()
    const editNoteMutation = useMutation({
        mutationFn: (body: { note: string; attendance_id: string; user_id: string }) =>
            attendanceApi.editNoteAttendance(body),
    })
    const handleClose = () => setOpen(false)
    const handleOpen = (user_id: string) => {
        setOpen(true)
        userIdRef.current = user_id
        setDataNote({
            user_id,
            attendance_id: attendance_id as string,
        })
    }
    const handleSubmit = (note: string) => {
        const body = {
            note,
            attendance_id: attendance_id as string,
            user_id: userIdRef.current,
        }
        editNoteMutation.mutate(body, {
            onSuccess(data) {
                toast.success(data.data.message)
                userIdRef.current = ''
            },
        })
    }

    const cancelAttendanceDetailMutation = useMutation({
        mutationFn: (params: { attendance_id: string; user_id: string }) =>
            attendanceApi.deleteAttendanceDetail(params.attendance_id, params.user_id),
    })
    const handleCancelAttendance = (user_id: string) => {
        cancelAttendanceDetailMutation.mutate(
            { attendance_id: attendance_id as string, user_id: user_id },
            {
                onSuccess() {
                    toast.success('Hủy điểm danh thành công')
                    queryClient.invalidateQueries({ queryKey: ['attendanceDetail', attendance_id] })
                },
            },
        )
    }

    function exportToExcel() {
        const ws = XLSX.utils.json_to_sheet(
            listAttendanceDetail.map((user, index) => ({
                STT: index + 1,
                MSSV: user.user_id.code,
                'Họ Và Tên': user.user_id.fullname,
                Lớp: 'D20_TH03',
            })),
        )
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
        XLSX.writeFile(wb, 'C:\\Users\\tranvansi\\Downloads\\danhsachcomat.xlsx')
    }
    return (
        <div>
            <ModalNote dataNote={dataNote} onSubmit={handleSubmit} open={open} handleClose={handleClose} />
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
                            className='w-[20%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
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
                            className='w-[15%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Lớp
                        </th>
                        <th
                            scope='col'
                            className='w-[15%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Điểm Danh Lúc
                        </th>
                        <th
                            scope='col'
                            className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Ghi Chú
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                    {listAttendanceDetail &&
                        listAttendanceDetail.map((user, index) => (
                            <tr key={user.user_id._id} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                                <td className='px-4 py-3  text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                    {index + 1}
                                </td>
                                <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                    <Button size='medium'>{user.user_id.code}</Button>
                                </td>
                                <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                    {user.user_id.fullname}
                                </td>
                                <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                    <Button size='medium' color='warning' variant='outlined'>
                                        D20_TH03
                                    </Button>
                                </td>
                                <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                    <Button color='error' size='medium'>
                                        {extractDateTimeFull(user.updatedAt)}
                                    </Button>
                                </td>
                                <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                    <Button
                                        onClick={() => handleOpen(user.user_id._id)}
                                        size='medium'
                                        color='success'
                                        variant='contained'
                                    >
                                        Ghi chú
                                    </Button>
                                    <Button
                                        onClick={() => handleCancelAttendance(user.user_id._id)}
                                        size='medium'
                                        color='warning'
                                        variant='contained'
                                    >
                                        Hủy Điểm Danh
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
