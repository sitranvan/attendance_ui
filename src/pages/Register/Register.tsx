import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from '~/apis/auth.api'
import MyButton from '~/components/MyButton'
import MyInput from '~/components/MyInput'
import pathRouter from '~/constants/path'
import { ErrorResponse } from '~/types/utils.type'
import { isAxiosUnprocessableEntity } from '~/utils/helpers'

import { AuthSchema, authSchema } from '~/utils/rules'

type FormData = Pick<AuthSchema, 'email' | 'password' | 'confirm_password'>
const registerSchema = authSchema.pick(['email', 'password', 'confirm_password'])
export default function Register() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(registerSchema),
    })
    const registerMutation = useMutation({
        mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.register(body),
    })

    const onSubmit = handleSubmit((data) => {
        const body = omit(data, 'confirm_password')
        registerMutation.mutate(body, {
            onSuccess: (data) => {
                toast.success(data.data.message)
            },
            onError: (error) => {
                if (isAxiosUnprocessableEntity<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
                    const formError = error.response?.data.data
                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(key as keyof Omit<FormData, 'confirm_password'>, {
                                type: 'server',
                                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                            })
                        })
                    }
                }
            },
        })
    })
    return (
        <div className='flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 lg:mt-8'>
            <div className='w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg lg:shadow'>
                <h2 className='text-2xl font-bold text-gray-900 '>Đăng ký tài khoản</h2>
                <form className='mt-8' onSubmit={onSubmit} noValidate>
                    <MyInput
                        type='email'
                        name='email'
                        register={register}
                        errorMessages={errors.email?.message}
                        placeholder='name@company.com'
                        label='Email của bạn'
                    />

                    <MyInput
                        className='my-3'
                        type='password'
                        name='password'
                        register={register}
                        errorMessages={errors.password?.message}
                        placeholder='••••••••'
                        label='Mật khẩu'
                    />
                    <MyInput
                        type='password'
                        name='confirm_password'
                        register={register}
                        errorMessages={errors.confirm_password?.message}
                        placeholder='••••••••'
                        label='Nhập lại mật khẩu'
                    />
                    <div className='flex items-start mt-5'>
                        <div className='flex items-center h-5'>
                            <input
                                id='remember'
                                aria-describedby='remember'
                                name='remember'
                                type='checkbox'
                                className='w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 '
                            />
                        </div>
                        <div className='ml-3 text-sm'>
                            <label htmlFor='remember' className='font-medium text-gray-900 '>
                                Tôi đồng ý với{' '}
                                <a href='#' className='text-primary-700 hover:underline '>
                                    Các điều khoản
                                </a>
                            </label>
                        </div>
                    </div>
                    <MyButton className='mt-7' isLoading={registerMutation.isPending} minWidth='160px' type='submit'>
                        Đăng ký ngay
                    </MyButton>
                    <div className='text-sm font-medium text-gray-500 mt-6'>
                        Bạn đã có tài khoản?{' '}
                        <Link to={pathRouter.login} className='text-primary-700 hover:underline '>
                            Đăng nhập ngay
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
