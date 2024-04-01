import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import attendanceApi from '~/apis/attendance.api'
import moduleApi from '~/apis/module.api'
import shiftApi from '~/apis/shift.api'
import userApi from '~/apis/user.api'
import Breadcrumb from '~/components/Breadcrumb'
import Loading from '~/components/Loading'

interface FormData {
    user_id: string
    shift_id: string
    module_id: string
}
interface ShiftData {
    shift_id: string
    user_id: string
}
export default function AddUserToShift() {
    const { register, handleSubmit } = useForm<FormData>()
    const { id: shift_id } = useParams<{ id: string }>()
    const [module, setModule] = useState<string>('')
    const [admin, setAdmin] = useState<string>('')

    const { data: dataUserModule, isFetching } = useQuery({
        queryKey: ['getUserByModule', module],
        queryFn: () => moduleApi.getUserByModule(module),
        staleTime: 1000,
        placeholderData: keepPreviousData,
        enabled: !!module,
    })

    const { data: dataModule } = useQuery({
        queryKey: ['getAllModule'],
        queryFn: () => moduleApi.getAllModule(),
    })

    const { data: dataTeacher } = useQuery({
        queryKey: ['getFullUser'],
        queryFn: () => userApi.getFullUser(),
    })

    const createAttendanceMutation = useMutation({
        mutationFn: (body: { shift_id: string; user_id: string; module_id: string }) =>
            attendanceApi.createAttendance(body),
    })

    const addUserToShiftMutation = useMutation({
        mutationFn: (body: { shift_id: string; user_id: string }[]) => shiftApi.addUserToShift(body),
    })

    const dataShift: ShiftData[] = useMemo(() => {
        if (!dataUserModule) return [] // Nếu không có dữ liệu, trả về mảng rỗng

        return dataUserModule.data.data.map((user) => ({
            shift_id: shift_id as string,
            user_id: user.user_id._id as string,
        }))
    }, [dataUserModule, shift_id])
    console.log(dataShift)
    const onSubmit = handleSubmit((data) => {
        const body = {
            shift_id: shift_id as string,
            user_id: data.user_id,
            module_id: data.module_id,
        }
        createAttendanceMutation.mutate(body, {
            onSuccess: (data) => {
                toast.success(data.data.message)
            },
        })
        addUserToShiftMutation.mutate(dataShift, {
            onSuccess: (data) => {
                console.log(data.data.message)
            },
        })
    })

    // const handleAddToShift = (user_id: string) => {
    //     const body = {
    //         user_id,
    //         shift_id: shift_id as string,
    //     }
    //     addUserToShiftMutation.mutate(body, {
    //         onSuccess: (data) => {
    //             toast.success(data.data.message)
    //         },
    //     })
    // }

    return (
        <div>
            <Breadcrumb props_two='Quản lý môn học' props_three='Thêm sinh viên vào môn học' />

            <div className='flex items-center gap-2'>
                <Typography color='grey' sx={{ textTransform: 'uppercase', mt: 1 }} fontSize='22px' variant='h2'>
                    Thêm sinh viên vào ca điểm danh
                </Typography>
                <AddOutlinedIcon sx={{ mt: 0.5, color: 'grey' }} />
            </div>
            <form onSubmit={onSubmit} className='w-full mt-6 flex item-center gap-5'>
                <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Chọn môn học</InputLabel>
                    <Select
                        {...register('module_id')}
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={module}
                        label='Chọn môn học'
                        onChange={(e) => setModule(e.target.value as string)}
                    >
                        {dataModule?.data.data.map((module) => (
                            <MenuItem key={module._id} value={module._id}>
                                {module.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ width: '700px' }}>
                    <InputLabel id='demo-simple-select-label1'>Chọn giáo viên</InputLabel>
                    <Select
                        {...register('user_id')}
                        value={admin}
                        onChange={(e) => setAdmin(e.target.value as string)}
                        labelId='demo-simple-select-label1'
                        id='demo-simple-select'
                        label='Chọn giáo viên '
                    >
                        {dataTeacher?.data.data.map((user) => {
                            if (user.role_info.slug === 'admin' || user.role_info.slug === 'student') return null
                            return (
                                <MenuItem key={user._id} value={user._id}>
                                    {user.fullname}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                <Button type='submit' variant='outlined' sx={{ width: '400px' }}>
                    Tạo ca
                </Button>
            </form>

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
                        {/* <th
                            scope='col'
                            className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Hành động
                        </th> */}
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                    {isFetching ? (
                        <tr className='flex items-center justify-center mt-10 '>
                            <td colSpan={6} className=''>
                                <Loading />
                            </td>
                        </tr>
                    ) : (
                        <>
                            {dataUserModule?.data.data.map((user, index) => (
                                <tr key={user.user_id._id} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                                    <td className='px-4 py-3 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        {index + 1}
                                    </td>
                                    <td className='max-w-sm px-4 py-3 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                        <Button size='medium'>{user.user_id.code}</Button>
                                    </td>
                                    <td className='max-w-sm px-4 py-3 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                        {user.user_id.fullname}
                                    </td>
                                    <td className='px-4 py-3 space-x-2 whitespace-nowrap'>
                                        <Button size='medium' color='warning' variant='outlined'>
                                            D20_TH03
                                        </Button>
                                    </td>
                                    <td className='max-w-sm px-4 py-3 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                        Công nghệ thông tin
                                    </td>
                                    {/* <td className='px-4 py-3 space-x-2 whitespace-nowrap'>
                                        <Button
                                            onClick={() => handleAddToShift(user._id)}
                                            endIcon={<AddOutlinedIcon />}
                                            size='medium'
                                            color='primary'
                                            variant='contained'
                                        >
                                            Thêm vào môn học
                                        </Button>
                                    </td> */}
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    )
}
