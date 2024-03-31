import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'
import { Button, Typography } from '@mui/material'
import Breadcrumb from '~/components/Breadcrumb'
import ListShift from './components/ListShift'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import { useQuery } from '@tanstack/react-query'
import shiftApi from '~/apis/shift.api'
import { Link } from 'react-router-dom'
import pathRouter from '~/constants/path'

export default function ManagerShift() {
    const { data: dataShift } = useQuery({
        queryKey: ['getAllShift'],
        queryFn: () => shiftApi.getAllShift(),
    })

    return (
        <div className=''>
            <Breadcrumb props_two='Điểm danh' />
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Typography color='grey' sx={{ textTransform: 'uppercase', mt: 1 }} fontSize='22px' variant='h2'>
                        Danh sách ca điểm danh
                    </Typography>
                    <FormatListNumberedOutlinedIcon sx={{ mt: 0.5, color: 'grey' }} />
                </div>
                <Link to={pathRouter.shift_create}>
                    <Button endIcon={<AddOutlinedIcon />} size='large' variant='outlined' color='secondary'>
                        Tạo ca điểm danh
                    </Button>
                </Link>
            </div>
            <ListShift dataShift={dataShift?.data.data ?? []} />
        </div>
    )
}
