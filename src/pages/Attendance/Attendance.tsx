import Breadcrumb from '~/components/Breadcrumb'
import MyCard from './components/MyCard'
import { useQuery } from '@tanstack/react-query'
import { getScheduleApi } from '~/apis/schedule.api'
import { useContext, useEffect } from 'react'
import { AppContext } from '~/contexts/app.context'

export default function Attendance() {
    const { profile } = useContext(AppContext)
    const { data: subjects } = useQuery({
        queryKey: ['getSchedule', 'userId'],
        queryFn: () => getScheduleApi(profile?._id as string),
    })
    useEffect(() => {
        console.log(subjects?.data.data)
    }, [subjects])
    return (
        <div>
            <Breadcrumb />
            <h1 className='text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white mb-4'>Điểm danh hôm nay</h1>
            <div className='flex items-start gap-4'>
                {subjects?.data.data.map((subject) => <MyCard key={subject._id} subject={subject} />)}
            </div>
        </div>
    )
}
