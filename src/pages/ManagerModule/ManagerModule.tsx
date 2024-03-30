import { Button, Typography } from '@mui/material'
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined'

import Breadcrumb from '~/components/Breadcrumb'

export default function ManagerModule() {
    return (
        <div className=''>
            <Breadcrumb props_two='Quản lý môn học' />
            <div className='flex items-center gap-2'>
                <Typography color='grey' sx={{ textTransform: 'uppercase', mt: 1 }} fontSize='22px' variant='h2'>
                    Danh sách môn học
                </Typography>
                <FormatListNumberedOutlinedIcon sx={{ mt: 0.5, color: 'grey' }} />
            </div>
            <table className='divide-y w-full divide-gray-200 dark:divide-gray-600 mt-6'>
                <thead className='bg-gray-100 dark:bg-gray-700 sticky top-0'>
                    <tr>
                        <th
                            scope='col'
                            className='w-[15%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            STT
                        </th>
                        <th
                            scope='col'
                            className='w-[45%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Tên môn học
                        </th>

                        <th
                            scope='col'
                            className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                        >
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                    {[1, 2, 3, 4].map((_, index) => (
                        <tr key={index} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                            <td className='px-4 py-3  text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                {index + 1}
                            </td>
                            <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                <Button size='medium'>DH52001793</Button>
                            </td>

                            <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                <Button
                                    endIcon={<DeleteForeverOutlinedIcon />}
                                    size='medium'
                                    color='error'
                                    variant='contained'
                                >
                                    Xóa
                                </Button>
                                <Button
                                    endIcon={<EditNoteOutlinedIcon />}
                                    size='medium'
                                    color='success'
                                    variant='contained'
                                >
                                    Sửa
                                </Button>
                                <Button
                                    endIcon={<BookmarkAddOutlinedIcon />}
                                    size='medium'
                                    color='info'
                                    variant='contained'
                                >
                                    Thêm sinh viên
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
