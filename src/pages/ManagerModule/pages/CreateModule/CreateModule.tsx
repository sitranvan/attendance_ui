import { Button, Typography } from '@mui/material'
import Breadcrumb from '~/components/Breadcrumb'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import MyInput from '~/components/MyInput'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import moduleApi from '~/apis/module.api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import pathRouter from '~/constants/path'
interface FormData {
    name: string
}
export default function CreateModule() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<FormData>()

    const createModuleMutation = useMutation({
        mutationFn: (body: { name: string }) => moduleApi.createModule(body),
    })

    const onSubmit = handleSubmit((data) => {
        createModuleMutation.mutate(data, {
            onSuccess: (data) => {
                toast.success(data.data.message)
                navigate(pathRouter.module)
            },
            onError: () => {
                toast.error('Thêm môn học thất bại')
            },
        })
    })
    return (
        <div>
            <Breadcrumb props_two='Quản lý môn học' props_three='Thêm môn học' />

            <div className='flex items-center gap-2'>
                <Typography color='grey' sx={{ textTransform: 'uppercase', mt: 1 }} fontSize='22px' variant='h2'>
                    Thêm môn học
                </Typography>
                <AddOutlinedIcon sx={{ mt: 0.5, color: 'grey' }} />
            </div>
            <form onSubmit={onSubmit} className='mt-6'>
                <div className='mt-6 grid md:grid-cols-2'>
                    <div className='mt-4 md:mt-0'>
                        <MyInput
                            className='my-3'
                            type='text'
                            name='name'
                            register={register}
                            placeholder='Nhập tên môn học...'
                            label='Tên môn học'
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
