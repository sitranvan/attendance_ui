import * as XLSX from 'xlsx'
import { Button } from '@mui/material'
import { User } from '~/types/user.type'
import { Module } from '~/types/module.type'
import UploadFileIcon from '@mui/icons-material/UploadFile'

interface ListStudentTableProps {
    listUsers: {
        _id: string
        module_id: Module
        user_id: User
    }[]
}
export default function ListStudentTable({ listUsers }: ListStudentTableProps) {
    function exportToExcel() {
        const ws = XLSX.utils.json_to_sheet(
            listUsers.map((user, index) => ({
                STT: index + 1,
                MSSV: user.user_id.code,
                'Họ Và Tên': user.user_id.fullname,
                Lớp: 'D20_TH03',
                'Giới Tính': user.user_id.gender ? 'Nam' : 'Nữ',
            })),
        )
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
        XLSX.writeFile(wb, 'C:\\Users\\tranvansi\\Downloads\\danhsachsinhvien.xlsx')
    }
    return (
        <div id='default-tab-content'>
            <div className='overflow-auto h-[420px]'>
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
                                className='w-[30%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
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
                                Giới Tính
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                        {listUsers &&
                            listUsers.map((user, index) => (
                                <tr key={user.user_id._id} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                                    <td className='px-4 py-3  text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        {index + 1}
                                    </td>
                                    <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                        {user.user_id.code}
                                    </td>
                                    <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                        {user.user_id.fullname}
                                    </td>
                                    <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                        D20_TH03
                                    </td>
                                    <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                        {user.user_id.gender ? 'Nam' : 'Nữ'}
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
        </div>
    )
}
