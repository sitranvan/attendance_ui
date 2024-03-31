import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { Button, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import shiftApi from '~/apis/shift.api'
import userApi from '~/apis/user.api'
import Breadcrumb from '~/components/Breadcrumb'

export default function AddUserToShift() {
    const { id: shift_id } = useParams<{ id: string }>()
    const { data: dataUser } = useQuery({
        queryKey: ['getAllUser'],
        queryFn: () => userApi.getAllUser(),
    })

    const addUserToShift = useMutation({
        mutationFn: (body: { shift_id: string; user_id: string }) => shiftApi.addUserToShift(body),
    })

    const handleAddToShift = (user_id: string) => {
        const body = {
            user_id,
            shift_id: shift_id as string,
        }
        addUserToShift.mutate(body, {
            onSuccess: (data) => {
                toast.success(data.data.message)
            },
        })
    }

    return (
        <div>
            <Breadcrumb props_two='Quản lý môn học' props_three='Thêm sinh viên vào môn học' />

            <div className='flex items-center gap-2'>
                <Typography color='grey' sx={{ textTransform: 'uppercase', mt: 1 }} fontSize='22px' variant='h2'>
                    Thêm sinh viên vào ca điểm danh
                </Typography>
                <AddOutlinedIcon sx={{ mt: 0.5, color: 'grey' }} />
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
                            className='w-[15%=%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            MSSV
                        </th>
                        <th
                            scope='col'
                            className='w-[20%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
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
                            className='w-[20%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Chuyên ngành
                        </th>
                        <th
                            scope='col'
                            className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                    {dataUser?.data.data.map((user, index) => (
                        <tr key={index} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
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
                            <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                Công nghệ thông tin
                            </td>
                            <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                <Button
                                    onClick={() => handleAddToShift(user._id)}
                                    endIcon={<AddOutlinedIcon />}
                                    size='medium'
                                    color='primary'
                                    variant='contained'
                                >
                                    Thêm vào môn học
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
