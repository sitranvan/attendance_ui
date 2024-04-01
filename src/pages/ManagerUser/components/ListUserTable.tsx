import { Button } from '@mui/material'
import { User } from '~/types/user.type'

interface ListUserTableProps {
    dataUser: User[]
}

export default function ListUserTable({ dataUser }: ListUserTableProps) {
    const handleDownloadQR = (qrcode: string) => {
        window.open(qrcode, '_blank')
    }

    return (
        <table className='divide-y w-full divide-gray-200 dark:divide-gray-600 mt-6'>
            <thead className='bg-gray-100 dark:bg-gray-700 sticky top-0'>
                <tr>
                    <th
                        scope='col'
                        className='w-[8%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                        STT
                    </th>
                    <th
                        scope='col'
                        className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                        MSSV
                    </th>
                    <th
                        scope='col'
                        className=' p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                        Họ Và Tên
                    </th>
                    <th
                        scope='col'
                        className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                        Lớp
                    </th>
                    <th
                        scope='col'
                        className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                        Chuyên ngành
                    </th>
                    <th
                        scope='col'
                        className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                        Vai trò
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
                {dataUser &&
                    dataUser.map((user, index) => {
                        if (user.role === 'admin') return null
                        return (
                            <tr key={user._id} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                                <td className='px-4 py-3  text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                    {index}
                                </td>
                                <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                    <Button size='medium'>{user.code}</Button>
                                </td>
                                <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                    {user.fullname}
                                </td>
                                <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                    {user.class ? (
                                        <Button size='medium' color='warning' variant='outlined'>
                                            {user.class}
                                        </Button>
                                    ) : (
                                        <Button size='medium' color='error' variant='outlined'>
                                            Không có lớp
                                        </Button>
                                    )}
                                </td>

                                <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                    {user.major}
                                </td>
                                <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                    {user.role_info.slug === 'student' ? (
                                        <Button size='medium' color='info' variant='outlined'>
                                            {user.role_info.name}
                                        </Button>
                                    ) : (
                                        <Button size='medium' color='error' variant='outlined'>
                                            {user.role_info.name}
                                        </Button>
                                    )}
                                </td>
                                <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                    <Button size='medium' color='warning' variant='contained'>
                                        Khóa tài khoản
                                    </Button>
                                    <Button size='medium' color='error' variant='contained'>
                                        Xóa
                                    </Button>
                                    <Button size='medium' color='success' variant='contained'>
                                        Sửa
                                    </Button>
                                    {user.role_info.slug === 'student' && (
                                        <Button
                                            onClick={() => handleDownloadQR(user.qr_code)}
                                            size='medium'
                                            color='info'
                                            variant='outlined'
                                        >
                                            Mã QR
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}
