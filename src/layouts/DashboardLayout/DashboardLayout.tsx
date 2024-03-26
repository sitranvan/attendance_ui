import DashboardHeader from '~/components/DashboardHeader'
import DashboardSidebar from '~/components/DashboardSidebar'

interface Props {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
    return (
        <div>
            <DashboardHeader />
            <div className='flex pt-16 overflow-hidden '>
                <DashboardSidebar />
                <div className='relative w-full h-full overflow-y-auto lg:ml-64 p-4 mt-3'>{children}</div>
            </div>
        </div>
    )
}
