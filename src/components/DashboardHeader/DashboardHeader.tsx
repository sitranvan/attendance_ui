import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import authApi from '~/apis/auth.api'
import { AppContext } from '~/contexts/app.context'
import { getRefreshTokenFromLS } from '~/utils/auth'

export default function DashboardHeader() {
    const { setIsAuthenticated, setProfile, profile } = useContext(AppContext)
    const [openDropdown, setOpenDropdown] = useState<boolean>(false)
    const logoutMutation = useMutation({
        mutationFn: (body: { refresh_token: string }) => authApi.logout(body),
        onSuccess: (data) => {
            toast.success(data.data.message)
            setIsAuthenticated(false)
            setProfile(null)
        },
    })
    const handleLogout = () => {
        const refresh_token = getRefreshTokenFromLS()
        const body = {
            refresh_token,
        }
        logoutMutation.mutate(body)
    }

    return (
        <nav className='fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
            <div className='px-3 py-3 lg:px-5 lg:pl-3'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-start'>
                        <button
                            id='toggleSidebarMobile'
                            aria-expanded='true'
                            aria-controls='sidebar'
                            className='p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        >
                            <svg
                                id='toggleSidebarMobileHamburger'
                                className='w-6 h-6'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                                    clipRule='evenodd'
                                />
                            </svg>
                            <svg
                                id='toggleSidebarMobileClose'
                                className='hidden w-6 h-6'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </button>
                        <a href='https://flowbite-admin-dashboard.vercel.app/' className='flex ml-2 md:mr-24'>
                            <img
                                src='https://flowbite-admin-dashboard.vercel.app/images/logo.svg'
                                className='h-8 mr-3'
                                alt='FlowBite Logo'
                            />
                            <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
                                Admin
                            </span>
                        </a>
                        <form action='#' method='GET' className='hidden lg:block lg:pl-3.5'>
                            <label htmlFor='topbar-search' className='sr-only'>
                                Search
                            </label>
                            <div className='relative mt-1 lg:w-96'>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <svg
                                        className='w-5 h-5 text-gray-500 dark:text-gray-400'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </div>
                                <input
                                    type='text'
                                    name='email'
                                    id='topbar-search'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                                    placeholder='Search'
                                />
                            </div>
                        </form>
                    </div>
                    <div className='flex items-center'>
                        <div className='hidden mr-3 -mb-1 sm:block'>
                            <span />
                        </div>
                        <button
                            id='toggleSidebarMobileSearch'
                            type='button'
                            className='p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        >
                            <span className='sr-only'>Search</span>
                            <svg
                                className='w-6 h-6'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </button>
                        <div className='flex items-center ml-3 relative'>
                            <div>
                                <button
                                    type='button'
                                    className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                                    id='user-menu-button-2'
                                    aria-expanded='false'
                                    data-dropdown-toggle='dropdown-2'
                                    onClick={() => setOpenDropdown(!openDropdown)}
                                >
                                    <span className='sr-only'>Open user menu</span>
                                    <img
                                        className='w-8 h-8 rounded-full'
                                        src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                                        alt='user photo'
                                    />
                                </button>
                            </div>
                            <div
                                className={` z-50 my-4  text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 ${openDropdown == false ? 'hidden' : 'block'}`}
                                id='dropdown-2'
                                data-popper-placement='bottom'
                                style={{
                                    position: 'absolute',
                                    left: -150,
                                    top: '135%',
                                    margin: 0,
                                }}
                            >
                                <div className='px-4 py-3' role='none'>
                                    <p className='text-sm text-gray-900 dark:text-white' role='none'>
                                        {profile?.fullname}
                                    </p>
                                    <p
                                        className='text-sm font-medium text-gray-900 truncate dark:text-gray-300'
                                        role='none'
                                    >
                                        {profile?.email}
                                    </p>
                                </div>
                                <ul className='py-1' role='none'>
                                    <li onClick={handleLogout}>
                                        <a
                                            href='#'
                                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                                            role='menuitem'
                                        >
                                            Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
