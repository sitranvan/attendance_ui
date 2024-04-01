import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'
import { Button, Typography } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'
import Breadcrumb from '~/components/Breadcrumb'
import ListUserTable from './components/ListUserTable'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import { Link } from 'react-router-dom'
import pathRouter from '~/constants/path'
export default function ManagerUser() {
    const { data: dataUser } = useQuery({
        queryKey: ['getAllUser'],
        queryFn: () => userApi.getFullUser(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        placeholderData: keepPreviousData,
    })

    return (
        <div className=''>
            <Breadcrumb props_two='Điểm danh' />
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Typography color='grey' sx={{ textTransform: 'uppercase', mt: 1 }} fontSize='22px' variant='h2'>
                        Danh sách người dùng
                    </Typography>
                    <FormatListNumberedOutlinedIcon sx={{ mt: 0.5, color: 'grey' }} />
                </div>
                <Link to={pathRouter.user_create}>
                    <Button endIcon={<AddOutlinedIcon />} size='large' variant='outlined' color='secondary'>
                        Tạo tài khoản
                    </Button>
                </Link>
            </div>

            <ListUserTable dataUser={dataUser?.data.data ?? []} />
        </div>
    )
}
