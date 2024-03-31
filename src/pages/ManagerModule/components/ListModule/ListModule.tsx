import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import pathRouter from '~/constants/path'
import { Module } from '~/types/module.type'

interface ListModuleProps {
    dataModule: Module[]
}

export default function ListModule({ dataModule }: ListModuleProps) {
    return (
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
                {dataModule &&
                    dataModule.map((module, index) => (
                        <tr key={module._id} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                            <td className='px-4 py-3  text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                {index + 1}
                            </td>
                            <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                <Button size='medium'>{module.name}</Button>
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
                                <Link to={pathRouter.module_add_user.replace(':id', module._id)}>
                                    <Button
                                        endIcon={<BookmarkAddOutlinedIcon />}
                                        size='medium'
                                        color='info'
                                        variant='contained'
                                    >
                                        Thêm sinh viên
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}
