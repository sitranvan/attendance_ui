import { useState } from 'react'
import { Link } from 'react-router-dom'
import pathRouter from '~/constants/path'

export default function DashboardSidebar() {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false)

    return (
        <aside
            id='sidebar'
            className='hidden  fixed top-0 left-0 z-20 flex-col flex-shrink-0 w-64 h-full pt-14 font-normal duration-75 lg:flex transition-width '
            aria-label='Sidebar'
        >
            <div className='relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                <div className='flex flex-col flex-1 pt-5 pb-4 overflow-y-auto'>
                    <div className='flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                        <ul className='pb-2 space-y-2'>
                            <li>
                                <button
                                    onClick={() => setOpenDropdown(!openDropdown)}
                                    type='button'
                                    className='flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                                >
                                    <svg
                                        className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                        xmlns='http://www.w3.org/2000/svg'
                                        aria-hidden='true'
                                    >
                                        <path d='M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z' />
                                    </svg>
                                    <span
                                        className='flex-1 ml-3 text-left whitespace-nowrap'
                                        sidebar-toggle-item='true'
                                    >
                                        Quản lý sinh viên
                                    </span>
                                    <svg
                                        sidebar-toggle-item='true'
                                        className='w-6 h-6'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </button>
                                <ul id='dropdown-layouts' className={` ${openDropdown == false ? 'hidden' : false}`}>
                                    <li>
                                        <a
                                            href='https://flowbite-admin-dashboard.vercel.app/layouts/stacked/'
                                            className='flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                                        >
                                            Stacked
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href='https://flowbite-admin-dashboard.vercel.app/layouts/sidebar/'
                                            className='flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                                        >
                                            Sidebar
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link
                                    to={pathRouter.attendance}
                                    className='flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                                >
                                    <svg
                                        className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                        xmlns='http://www.w3.org/2000/svg'
                                        aria-hidden='true'
                                    >
                                        <path d='M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z' />
                                    </svg>
                                    <span
                                        className='flex-1 ml-3 text-left whitespace-nowrap'
                                        sidebar-toggle-item='true'
                                    >
                                        Quản lý điểm danh
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div
                    className='absolute bottom-0 left-0 justify-center hidden w-full p-4 space-x-4 bg-white lg:flex dark:bg-gray-800'
                    sidebar-bottom-menu='true'
                >
                    <a
                        href='#'
                        className='inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                        <svg
                            className='w-6 h-6'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path d='M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z' />
                        </svg>
                    </a>
                    <a
                        href='https://flowbite-admin-dashboard.vercel.app/settings/'
                        data-tooltip-target='tooltip-settings'
                        className='inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                        <svg
                            className='w-6 h-6'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </aside>
    )
}
