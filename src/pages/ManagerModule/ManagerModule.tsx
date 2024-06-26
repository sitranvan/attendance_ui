import { Button, Typography } from '@mui/material'
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import Breadcrumb from '~/components/Breadcrumb'
import { Link } from 'react-router-dom'
import pathRouter from '~/constants/path'
import ListModule from './components/ListModule'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import moduleApi from '~/apis/module.api'

export default function ManagerModule() {
    const { data: dataModule } = useQuery({
        queryKey: ['getAllModule'],
        queryFn: () => moduleApi.getAllModule(),
        placeholderData: keepPreviousData,
        staleTime: 1000,
    })

    return (
        <div className=''>
            <Breadcrumb props_two='Quản lý môn học' />
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Typography color='grey' sx={{ textTransform: 'uppercase', mt: 1 }} fontSize='22px' variant='h2'>
                        Danh sách môn học
                    </Typography>
                    <FormatListNumberedOutlinedIcon sx={{ mt: 0.5, color: 'grey' }} />
                </div>
                <Link to={pathRouter.module_create}>
                    <Button endIcon={<AddOutlinedIcon />} size='large' variant='outlined' color='secondary'>
                        Thêm môn học
                    </Button>
                </Link>
            </div>
            <ListModule dataModule={dataModule?.data.data ?? []} />
        </div>
    )
}
