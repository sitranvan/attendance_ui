import { Link } from 'react-router-dom'

interface MyCardProps {
    subject: any
}

export default function MyCard({ subject }: MyCardProps) {
    return (
        <div className='max-w-sm p-6 bg-white rounded-md border shadow bg-gradient-to-t from-green-300 to-green-200 hover:bg-gradient-to-b hover:from-teal-400 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 '>
            <div className='flex items-center mb-3 gap-2'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-7 h-7 text-gray-500 dark:text-gray-400 '
                >
                    <path
                        fillRule='evenodd'
                        d='M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z'
                        clipRule='evenodd'
                    />
                    <path d='M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z' />
                </svg>
                <span className='font-medium text-sm text-gray-500'>60 Sinh viên</span>
            </div>

            <h5 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>{subject.name}</h5>

            <p className='mb-3 font-normal text-gray-500 dark:text-gray-400'>
                Xây dựng phần mềm web với React,Nodejs, Tailwind CSS, và TypeScript
            </p>
            <Link
                to={`/attendance/${subject._id}`}
                className='inline-flex font-medium items-center text-blue-600 hover:underline'
            >
                Điểm danh sinh viên
                <svg
                    className='w-3 h-3 ms-2.5 rtl:rotate-[270deg]'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 18'
                >
                    <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778'
                    />
                </svg>
            </Link>
        </div>
    )
}
