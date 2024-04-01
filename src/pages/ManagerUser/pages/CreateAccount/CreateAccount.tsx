import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { Button, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from '~/apis/auth.api'
import classApi from '~/apis/class.api'
import levelApi from '~/apis/level.api'
import majorApi from '~/apis/major.api'
import roleApi from '~/apis/role.api'
import Breadcrumb from '~/components/Breadcrumb'
import MyInput from '~/components/MyInput'
import pathRouter from '~/constants/path'
import { queryClient } from '~/main'

export interface FormDataAccount {
    code: string
    fullname: string
    gender: string
    email: string
    password: string
    role: string
    class: string
    major: string
    level: string
}

export default function CreateAccount() {
    const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm<FormDataAccount>() // Add setValue
    const { data: dataRole } = useQuery({
        queryKey: ['getAllRole'],
        queryFn: () => roleApi.getAllRole(),
    })
    const { data: dataMajor } = useQuery({
        queryKey: ['getAllMajor'],
        queryFn: () => majorApi.getAllMajor(),
    })
    const { data: dataClass } = useQuery({
        queryKey: ['getAllClass'],
        queryFn: () => classApi.getAllClass(),
    })

    const { data: dataLevel } = useQuery({
        queryKey: ['getAllLevel'],
        queryFn: () => levelApi.getAllLevel(),
    })

    const createAccountMutation = useMutation({
        mutationFn: (body: FormDataAccount) => authApi.createAccount(body),
    })
    // Add onChange handlers
    const handleMajorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue('major', e.target.value)
    }

    const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue('class', e.target.value)
    }

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue('gender', e.target.value)
    }

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue('role', e.target.value)
    }

    const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue('level', e.target.value)
    }

    const onSubmit = handleSubmit((data) => {
        createAccountMutation.mutate(data, {
            onSuccess: (data) => {
                toast.success(data.data.message)
                queryClient.invalidateQueries({
                    queryKey: ['getAllUser'],
                })
                navigate(pathRouter.user)
            },
        })
    })

    return (
        <div>
            <Breadcrumb props_two='Quản lý người dùng' props_three='Tạo tài khoản' />

            <div className='flex items-center gap-2'>
                <Typography color='grey' sx={{ textTransform: 'uppercase', mt: 1 }} fontSize='22px' variant='h2'>
                    Tạo tài khoản người dùng
                </Typography>
                <AddOutlinedIcon sx={{ mt: 0.5, color: 'grey' }} />
            </div>
            <form onSubmit={onSubmit} className='mt-6'>
                <div className='mt-6 grid md:grid-cols-2 gap-x-10'>
                    <div className='mt-4 md:mt-0'>
                        <MyInput
                            className='my-3'
                            type='text'
                            name='code'
                            register={register}
                            placeholder='Nhập mã số...'
                            label='Mã số'
                        />
                    </div>
                    <div className='mt-4 md:mt-0 flex flex-col justify-center'>
                        <label
                            htmlFor='countries_disabled'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Chuyên ngành
                        </label>
                        <select
                            {...register('major')}
                            id='countries_disabled'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                            onChange={handleMajorChange} // Add onChange
                        >
                            <option value=''>Chọn chuyên ngành</option> {/* Default option */}
                            {dataMajor?.data.data.map((item) => (
                                <option key={item._id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='mt-4 md:mt-0'>
                        <MyInput
                            className='my-3'
                            type='text'
                            name='fullname'
                            register={register}
                            placeholder='Nhập họ tên...'
                            label='Họ tên'
                        />
                    </div>

                    <div className='mt-4 md:mt-0 flex flex-col justify-center'>
                        <label
                            htmlFor='countries_disabled'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Lớp (Chỉ dành cho sinh viên)
                        </label>
                        <select
                            {...register('class')}
                            id='countries_disabled'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                            onChange={handleClassChange} // Add onChange
                        >
                            <option value=''>Chọn lớp</option> {/* Default option */}
                            {dataClass?.data.data.map((item) => (
                                <option key={item._id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mt-4 md:mt-0 flex flex-col justify-center'>
                        <label
                            htmlFor='countries_disabled'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Giới tính
                        </label>
                        <select
                            {...register('gender')}
                            id='countries_disabled'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                            onChange={handleGenderChange} // Add onChange
                        >
                            <option value=''>Chọn giới tính</option> {/* Default option */}
                            <option value={1}>Nam</option>
                            <option value={0}>Nữ</option>
                        </select>
                    </div>

                    <div className='mt-4 md:mt-0 flex flex-col justify-center'>
                        <label
                            htmlFor='countries_disabled'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Vai trò
                        </label>
                        <select
                            id='countries_disabled'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                            onChange={handleRoleChange} // Add onChange
                        >
                            <option value=''>Chọn vai trò</option> {/* Default option */}
                            {dataRole?.data.data.map((item) => {
                                if (item.slug === 'admin') return null
                                return (
                                    <option key={item._id} value={item.slug}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='mt-4 md:mt-0'>
                        <MyInput
                            className='my-3'
                            type='text'
                            name='email'
                            register={register}
                            placeholder='Nhập email...'
                            label='Email'
                        />
                    </div>

                    <div className='mt-4 md:mt-0 flex flex-col justify-center'>
                        <label
                            htmlFor='countries_disabled'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Trình độ
                        </label>
                        <select
                            {...register('level')}
                            id='countries_disabled'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                            onChange={handleLevelChange} // Add onChange
                        >
                            <option value=''>Chọn trình độ</option> {/* Default option */}
                            {dataLevel?.data.data.map((item) => (
                                <option key={item._id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mt-4 md:mt-0'>
                        <MyInput
                            className='my-3'
                            type='text'
                            name='password'
                            register={register}
                            placeholder='Nhập mật khẩu...'
                            label='Tạo mật khẩu'
                        />
                    </div>
                </div>
                <div className='mt-3'>
                    <Button type='submit' sx={{ px: 5 }} variant='contained' color='primary'>
                        Xác nhận
                    </Button>
                </div>
            </form>
        </div>
    )
}
