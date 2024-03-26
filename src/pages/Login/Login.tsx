import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginApi } from '~/apis/auth.api'
import MyButton from '~/components/MyButton'

import MyInput from '~/components/MyInput'
import pathRouter from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import { ErrorResponse } from '~/types/utils.type'
import { isAxiosUnprocessableEntity } from '~/utils/helpers'
import { AuthSchema, authSchema } from '~/utils/rules'

type FormData = Pick<AuthSchema, 'email' | 'password'>
const loginSchema = authSchema.pick(['email', 'password'])
export default function Login() {
    const { setIsAuthenticated, setProfile } = useContext(AppContext)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(loginSchema),
    })

    const loginMutation = useMutation({
        mutationFn: (body: Omit<FormData, 'confirm_password'>) => loginApi(body),
    })

    const onSubmit = handleSubmit((data) => {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                toast.success(data.data.message)
                setIsAuthenticated(true)
                setProfile(data.data.data.user)
                navigate(pathRouter.dashboard)
            },
            onError: (error) => {
                if (isAxiosUnprocessableEntity<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
                    const formError = error.response?.data.data
                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            toast.error(formError[key as keyof Omit<FormData, 'confirm_password'>])
                        })
                    }
                }
            },
        })
    })

    return (
        <div className='flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 lg:mt-8'>
            <div className='w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow '>
                <h2 className='text-2xl font-bold text-gray-900 '>Đăng nhập</h2>
                <form className='mt-8 space-y-6' onSubmit={onSubmit} noValidate>
                    <div>
                        <MyInput
                            type='email'
                            name='email'
                            register={register}
                            errorMessages={errors.email?.message}
                            placeholder='name@company.com'
                            label='Email của bạn'
                        />
                    </div>
                    <div>
                        <MyInput
                            className='my-3'
                            type='password'
                            name='password'
                            register={register}
                            errorMessages={errors.password?.message}
                            placeholder='••••••••'
                            label='Mật khẩu'
                        />
                    </div>
                    <div className='flex items-start'>
                        <div className='flex items-center h-5'>
                            <input
                                id='remember'
                                aria-describedby='remember'
                                name='remember'
                                type='checkbox'
                                className='w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 0'
                            />
                        </div>
                        <div className='ml-3 text-sm'>
                            <label htmlFor='remember' className='font-medium text-gray-900'>
                                Ghi nhớ đăng nhập
                            </label>
                        </div>
                        <a href='#' className='ml-auto text-sm font-medium text-blue-500 hover:underline'>
                            Quên mật khẩu?
                        </a>
                    </div>
                    <MyButton isLoading={loginMutation.isPending} minWidth='160px' type='submit'>
                        Đăng nhập ngay
                    </MyButton>
                    <div className='text-sm font-medium text-gray-500 '>
                        Chưa có tài khoản?{' '}
                        <Link to={pathRouter.register} className='text-primary-700 hover:underline '>
                            Đăng ký ngay
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
