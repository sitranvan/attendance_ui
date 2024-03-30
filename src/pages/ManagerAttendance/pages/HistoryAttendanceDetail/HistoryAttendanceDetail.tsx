import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import attendanceApi from '~/apis/attendance.api'
import Breadcrumb from '~/components/Breadcrumb'

import CameraAltIcon from '@mui/icons-material/CameraAlt'
import ListStudentAbsent from '../../components/ListStudentAbsent'
import ListStudentScaner from '../../components/ListStudentScaner'
import ListStudentTable from '../../components/ListStudentTable'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function HistoryAttendanceDetail() {
    const [value, setValue] = useState<number>(0)
    const { id: attendance_id } = useParams<{ id: string }>()
    const { data: listUserShift } = useQuery({
        queryKey: ['attendanceUserShift', attendance_id],
        queryFn: () => attendanceApi.getAttendanceUserShift(attendance_id as string),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    })

    const { data: listAttendaceDetail } = useQuery({
        queryKey: ['attendanceDetail', attendance_id],
        queryFn: () => attendanceApi.getAttendanceDetail(attendance_id as string),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    })

    const { data: getAttendanceById } = useQuery({
        queryKey: ['getAttendanceById', attendance_id],
        queryFn: () => attendanceApi.getAttendanceById(attendance_id as string),
    })

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const listAbsent = useMemo(() => {
        return listUserShift?.data.data
            .filter((userShiftItem) => {
                return !listAttendaceDetail?.data.data.some((detailItem) => {
                    return detailItem.user_id._id === userShiftItem.user_id._id
                })
            })
            .map((item) => item.user_id)
    }, [listUserShift, listAttendaceDetail])

    return (
        <div>
            <Breadcrumb props_two='Điểm danh' props_three={getAttendanceById?.data.data.module_id.name} />

            <div className='flex items-center justify-between  mb-4'>
                <div className='flex items-center gap-2'>
                    <Typography color='grey' sx={{ textTransform: 'uppercase' }} fontSize='22px' variant='h2'>
                        {getAttendanceById?.data.data.module_id.name}
                    </Typography>
                    <CameraAltIcon sx={{ mt: 0.2, color: 'grey' }} />
                </div>
            </div>

            {/* Content */}
            <div className='flex items-start gap-4'>
                <div className='flex-1'>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                                <Tab label='Danh sách sinh viên' {...a11yProps(0)} />
                                <Tab label='Có mặt' {...a11yProps(1)} />
                                <Tab label='Vắng mặt' {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <div id='default-tab-content'>
                                {listUserShift?.data.data.length == 0 ? (
                                    <div className='flex justify-center'>
                                        <Button variant='outlined' color='warning' sx={{ textAlign: 'center', mt: 2 }}>
                                            Chưa có sinh viên nào đăng ký
                                        </Button>
                                    </div>
                                ) : (
                                    <ListStudentTable listUsers={listUserShift?.data.data ?? []} />
                                )}
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            {/* <div className='h-[400px]' id='default-tab-content'> */}
                            <div id='default-tab-content'>
                                {listAttendaceDetail?.data.data.length == 0 ? (
                                    <div className='flex justify-center'>
                                        <Button variant='outlined' color='warning' sx={{ textAlign: 'center', mt: 2 }}>
                                            Chưa có sinh viên nào điểm danh
                                        </Button>
                                    </div>
                                ) : (
                                    <ListStudentScaner listAttendanceDetail={listAttendaceDetail?.data.data ?? []} />
                                )}
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <div id='default-tab-content'>
                                {listAbsent?.length == 0 ? (
                                    <div className='flex justify-center'>
                                        <Button variant='outlined' color='warning' sx={{ textAlign: 'center', mt: 2 }}>
                                            Không có sinh viên vắng
                                        </Button>
                                    </div>
                                ) : (
                                    <ListStudentAbsent listAbsent={listAbsent ?? []} />
                                )}
                            </div>
                        </CustomTabPanel>
                    </Box>
                </div>
            </div>
        </div>
    )
}
