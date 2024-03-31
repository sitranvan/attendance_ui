import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import pathRouter from '~/constants/path'
import { Shift } from '~/types/shift.type'
import { checkExistAttendance, formatDate, isDateBeforeToday } from '~/utils/helpers'

interface ListShiftProps {
    dataShift: Shift[]
}

export default function ListShift({ dataShift }: ListShiftProps) {
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
                        className='w-[15%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                        Buổi
                    </th>
                    <th
                        scope='col'
                        className='w-[15%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                        Thời gian
                    </th>
                    <th
                        scope='col'
                        className='w-[15%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                        Thứ
                    </th>
                    <th
                        scope='col'
                        className='w-[15%] p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                        Trạng thái
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
                {dataShift &&
                    dataShift.map((shift, index) => (
                        <tr key={index} className={`hover:bg-gray-100 dark:hover:bg-gray-700 `}>
                            <td className='px-4 py-3  text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                {index + 1}
                            </td>
                            <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                {shift.shift_name}
                            </td>
                            <td className='max-w-sm px-4 py-3  overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                                {formatDate(shift.shift_time)}
                            </td>
                            <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                <Button size='medium' color='primary' variant='outlined'>
                                    {shift.days_of_week}
                                </Button>
                            </td>
                            <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                {isDateBeforeToday(shift.shift_time) ? (
                                    <Button size='medium' color='success'>
                                        Đã hoàn thành
                                    </Button>
                                ) : (
                                    <Button size='medium' color='warning'>
                                        Chưa hoàn thành
                                    </Button>
                                )}
                            </td>
                            <td className='px-4 py-3  space-x-2 whitespace-nowrap'>
                                <ShiftButton shift={shift} />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

interface ShiftButtonProps {
    shift: Shift
}
function ShiftButton({ shift }: ShiftButtonProps) {
    const [attendanceExists, setAttendanceExists] = useState(false)

    useEffect(() => {
        checkExistAttendance(shift._id).then((res) => {
            setAttendanceExists(res)
        })
    }, [shift._id])

    return (
        <Fragment>
            {isDateBeforeToday(shift.shift_time) ? (
                <Button disabled endIcon={<AddIcon />} size='medium' variant='contained'>
                    Đã hoàn thành điểm danh
                </Button>
            ) : (
                <Link to={attendanceExists ? '#' : pathRouter.shift_add_user.replace(':id', shift._id)}>
                    <Button
                        endIcon={<AddIcon />}
                        size='medium'
                        color='success'
                        variant='contained'
                        disabled={attendanceExists}
                    >
                        {attendanceExists ? 'Đã thêm' : 'Thêm sinh viên vào ca điểm danh'}
                    </Button>
                </Link>
            )}
        </Fragment>
    )
}
