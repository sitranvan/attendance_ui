import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Scanner } from '@yudiel/react-qr-scanner'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAttendanceDetailByAttendanceIdApi } from '~/apis/attendance.api'
import { scanerQRCodeApi } from '~/apis/scaner.api'
import Breadcrumb from '~/components/Breadcrumb'
export default function QRCode() {
    const queryClient = useQueryClient()
    const { id: scheduleId } = useParams<{ id: string }>()
    const scanerQRCodeMutation = useMutation({
        mutationFn: (body: any) => scanerQRCodeApi(body),
    })

    const { data } = useQuery({
        queryKey: ['getAttendanceDetailByAttendanceIdApi', scheduleId],
        queryFn: () => getAttendanceDetailByAttendanceIdApi(scheduleId as string),
    })

    const handleScaner = (content: string) => {
        // Chỉ gọi lại khi content khác với previousContent

        const body = {
            content,
            attendance_id: scheduleId as string,
            code: content.split('_')[0],
        }

        scanerQRCodeMutation.mutate(body, {
            onSuccess: (data) => {
                alert('Nhấn để tiếp tục!!')
                toast.success(data.data.message)
                queryClient.fetchQuery({
                    queryKey: ['getAttendanceDetailByAttendanceIdApi', scheduleId],
                })
            },
        })
    }

    const handleError = () => {
        toast.error('Có lỗi xảy ra khi quét mã QR')
    }
    return (
        <div>
            <Breadcrumb />
            <div className='flex items-center justify-between  mb-4'>
                <div className='flex items-center gap-2'>
                    <h1 className='text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white'>
                        Xây dựng phần mềm web
                    </h1>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='red' className='w-6 h-6'>
                        <path d='M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z' />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className='flex items-start gap-4'>
                <div className='w-[469px] h-[469px]'>
                    <Scanner
                        styles={{
                            video: {
                                width: '100%',
                                height: '100%',
                            },
                        }}
                        components={{
                            tracker: true,
                        }}
                        onResult={handleScaner}
                        onError={handleError}
                    />
                </div>

                <div className='flex-1'>
                    <div>
                        <div className='mb-4 border-b border-gray-200 dark:border-gray-700'>
                            <ul
                                className='flex flex-wrap -mb-px text-sm font-medium text-center'
                                id='default-tab'
                                data-tabs-toggle='#default-tab-content'
                                role='tablist'
                            >
                                <li className='me-2' role=''>
                                    <button
                                        className='inline-block px-4 pb-4 border-b-2 rounded-t-lg'
                                        id='tab01-tab'
                                        role='tab'
                                        aria-controls='tab01'
                                        aria-selected='false'
                                    >
                                        Danh sách sinh viên
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className='h-[400px]' id='default-tab-content'>
                            <div className='overflow-auto h-[420px]'>
                                <table className='divide-y w-full divide-gray-200 dark:divide-gray-600'>
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
                                                className='w-[25%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                                            >
                                                MSSV
                                            </th>
                                            <th
                                                scope='col'
                                                className='w-[40%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                                            >
                                                Họ Và Tên
                                            </th>
                                            <th
                                                scope='col'
                                                className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                                            >
                                                Thao Tác
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                                        {data?.data.data.map((item: any, index: any) => (
                                            <tr key={index} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                                                <td className='px-4 py-3  text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                                    {index + 1}
                                                </td>
                                                <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                                    {item.user_info.code}
                                                </td>
                                                <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                                    {item.user_info.fullname}
                                                </td>
                                                <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                                    <div>
                                                        <button
                                                            type='button'
                                                            className='inline-flex items-center text-white  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm  px-3 py-2 text-center me-2 '
                                                        >
                                                            Ghi chú
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 '
                                                        >
                                                            Hủy điểm danh
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
