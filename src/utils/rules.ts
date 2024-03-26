import * as yup from 'yup'
import { RegisterOptions, UseFormGetValues } from 'react-hook-form'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const getRules = (getRules?: UseFormGetValues<any>): Rules => ({
    email: {
        required: {
            value: true,
            message: 'Email không được để trống',
        },
        pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Email không hợp lệ',
        },
    },
    password: {
        required: {
            value: true,
            message: 'Mật khẩu không được để trống',
        },
        maxLength: {
            value: 20,
            message: 'Mật khẩu từ 6-20 ký tự',
        },
        minLength: {
            value: 6,
            message: 'Mật khẩu từ 6-20 ký tự',
        },
    },
    confirm_password: {
        required: {
            value: true,
            message: 'Nhập lại mật khẩu không được để trống',
        },
        maxLength: {
            value: 20,
            message: 'Nhập lại mật khẩu từ 6-20 ký tự',
        },
        minLength: {
            value: 6,
            message: 'Nhập lại mật khẩu từ 6-20 ký tự',
        },
        validate:
            typeof getRules === 'function'
                ? (value) => value === getRules('password') || 'Mật khẩu không khớp'
                : undefined,
    },
})

const handleConfirmPasswordYup = (refString: string) => {
    return yup
        .string()
        .required('Nhập lại password là bắt buộc')
        .min(6, 'Độ dài từ 6 - 160 ký tự')
        .max(160, 'Độ dài từ 6 - 160 ký tự')
        .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

export const authSchema = yup.object({
    email: yup
        .string()
        .required('Email là bắt buộc')
        .email('Email không đúng định dạng')
        .min(5, 'Độ dài từ 5 - 160 ký tự')
        .max(160, 'Độ dài từ 5 - 160 ký tự'),
    password: yup
        .string()
        .required('Password là bắt buộc')
        .min(6, 'Độ dài từ 6 - 160 ký tự')
        .max(160, 'Độ dài từ 6 - 160 ký tự'),
    confirm_password: handleConfirmPasswordYup('password'),
})

export type AuthSchema = yup.InferType<typeof authSchema>
