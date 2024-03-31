import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { Button, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import shiftApi from '~/apis/shift.api'
import Breadcrumb from '~/components/Breadcrumb'
import pathRouter from '~/constants/path'

const daysOfWeek: { label: string }[] = [
    { label: 'Thứ hai' },
    { label: 'Thứ ba' },
    { label: 'Thứ tư' },
    { label: 'Thứ năm' },
    { label: 'Thứ sáu' },
    { label: 'Thứ bảy' },
]

const shiftName: { label: string }[] = [{ label: 'Ca sáng' }, { label: 'Ca chiều' }]

interface FormData {
    shift_time: string
    shift_name: string
    days_of_week: string
}

export default function CreateShift() {
    const { register, handleSubmit } = useForm<FormData>()
    const navigate = useNavigate()
    const createShiftMutation = useMutation({
        mutationFn: (body: { shift_time: string; shift_name: string; days_of_week: string }) =>
            shiftApi.createShift(body),
    })

    const onSubmit = handleSubmit((data) => {
        createShiftMutation.mutate(data, {
            onSuccess: (data) => {
                toast.success(data.data.message)
                navigate(pathRouter.shift)
            },
        })
    })

    return (
        <div>
            <Breadcrumb props_two='Quản lý môn học' props_three='Thêm môn học' />

            <div className='flex items-center gap-2'>
                <Typography color='grey' sx={{ textTransform: 'uppercase', mt: 1 }} fontSize='22px' variant='h2'>
                    Tạo ca điểm danh
                </Typography>
                <AddOutlinedIcon sx={{ mt: 0.5, color: 'grey' }} />
            </div>
            <form onSubmit={onSubmit} className='mt-6'>
                <div className='mt-6 grid md:grid-cols-1 gap-y-5'>
                    <div className='mt-4 md:mt-0 lg:w-1/2'>
                        <label
                            htmlFor='countries_disabled'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Chọn thời gian
                        </label>
                        <input
                            {...register('shift_time')}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            type='datetime-local'
                        />
                    </div>
                    <div className='mt-4 md:mt-0 lg:w-1/2'>
                        <label
                            htmlFor='countries_disabled'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Chọn thứ
                        </label>
                        <select
                            {...register('days_of_week')}
                            id='countries_disabled'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                        >
                            {daysOfWeek.map((day) => (
                                <option key={day.label} value={day.label}>
                                    {day.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mt-4 md:mt-0 lg:w-1/2'>
                        <label
                            htmlFor='countries_disabled'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Chọn ca
                        </label>
                        <select
                            {...register('shift_name')}
                            id='countries_disabled'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                        >
                            {shiftName.map((name) => (
                                <option key={name.label} value={name.label}>
                                    {name.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='mt-5'>
                    <Button type='submit' sx={{ px: 5 }} variant='contained' color='primary'>
                        Xác nhận
                    </Button>
                </div>
            </form>
        </div>
    )
}
