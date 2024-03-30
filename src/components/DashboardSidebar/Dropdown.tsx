import React, { useState, useEffect } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Link, useLocation } from 'react-router-dom'

interface DropdownProps {
    title: React.ReactNode
    drownDown?: boolean
    items: { icon: React.ReactNode; label: string; to: string }[]
}

export default function Dropdown({ title, items, drownDown = true }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { pathname } = useLocation()

    // Tự động mở dropdown tương ứng khi trang được tải lại
    useEffect(() => {
        const item = items.find((item) => item.to === pathname)
        if (item) {
            setIsOpen(true)
        }
    }, [pathname, items])

    return (
        <li>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 `}
            >
                {title}
                {drownDown && <KeyboardArrowDownIcon />}
            </button>
            {isOpen && (
                <ul id='dropdown-layouts'>
                    {items.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.to}
                                className={`flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-5 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 ${pathname === item.to ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                            >
                                <span className='mr-2'>{item.icon}</span>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}
