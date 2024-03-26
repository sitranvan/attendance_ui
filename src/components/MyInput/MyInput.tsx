import classNames from 'classnames'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface MyInputProps {
    type: React.HTMLInputTypeAttribute
    errorMessages?: string
    placeholder?: string
    className?: string
    name: string
    label?: string
    register: UseFormRegister<any>
    rules?: RegisterOptions
}

export default function MyInput({
    type,
    errorMessages,
    placeholder,
    className,
    name,
    label,
    register,
    rules,
}: MyInputProps) {
    console.log(errorMessages)
    return (
        <div className={className}>
            <label
                htmlFor={name}
                className={classNames('block mb-2 text-sm font-medium text-gray-900', {
                    'text-red-600': errorMessages,
                })}
            >
                {label}
            </label>
            <input
                type={type}
                id={name}
                className={classNames(
                    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 font-normal',
                    {
                        'bg-red-50 border border-red-500 text-red-600 placeholder-red-700 focus:border-red-600 focus:ring-blue-600':
                            errorMessages,
                    },
                )}
                placeholder={placeholder}
                {...register(name, rules)}
            />
            {errorMessages && <p className='text-red-600 text-[13px] font-normal'>{errorMessages}</p>}
        </div>
    )
}
