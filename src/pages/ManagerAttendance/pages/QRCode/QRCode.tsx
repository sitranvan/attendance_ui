import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Paper, { PaperProps } from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { Scanner } from '@yudiel/react-qr-scanner'
import React, { useMemo, useState } from 'react'
import Draggable from 'react-draggable'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import attendanceApi from '~/apis/attendance.api'
import Breadcrumb from '~/components/Breadcrumb'
import { queryClient } from '~/main'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import ListStudentAbsent from '../../components/ListStudentAbsent'
import ListStudentScaner from '../../components/ListStudentScaner'
import ListStudentTable from '../../components/ListStudentTable'

const PaperComponent = (props: PaperProps) => {
    return (
        <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    )
}

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

export default function QRCode() {
    const [value, setValue] = useState<number>(0)
    const [open, setOpen] = React.useState(false)
    // Tạo state mảng chứa content
    const [dataTemp, setDataTemp] = useState<string[]>([])
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

    const scanerMutation = useMutation({
        mutationFn: (body: { attendance_id: string; user_id: string }) => attendanceApi.scanerAttendance(body),
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const handleError = () => {
        toast.error('Có lỗi xảy ra khi quét mã QR')
    }
    const handleScaner = (content: string) => {
        setDataTemp((prev) => [...prev, content])
        if (dataTemp.includes(content)) {
            return
        }
        const body = {
            attendance_id: attendance_id as string,
            user_id: content,
        }
        alert('Nhấn ok để tiếp tục!')
        scanerMutation.mutate(body, {
            onSuccess: () => {
                toast.success('Điểm danh thành công')
                queryClient.invalidateQueries({ queryKey: ['attendanceDetail', attendance_id] })
            },
        })
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
                {listUserShift?.data?.data[0] && (
                    <div className='flex items-center gap-x-3'>
                        <a
                            target='_blank'
                            href='https://docs.google.com/spreadsheets/d/1QvrWfJQnrViyY95vRn2qVqZrz7ocMmvBUCEBaVu8gCQ/edit#gid=0'
                        >
                            <Button endIcon={<ArrowOutwardIcon />} size='large' color='secondary' variant='outlined'>
                                Sheets
                            </Button>
                        </a>
                        <Button
                            endIcon={<QrCodeScannerIcon />}
                            size='large'
                            color='secondary'
                            variant='outlined'
                            onClick={handleClickOpen}
                        >
                            Quét mã QR
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            PaperComponent={PaperComponent}
                            aria-labelledby='draggable-dialog-title'
                        >
                            <DialogTitle style={{ cursor: 'move', fontSize: '18px' }} id='draggable-dialog-title'>
                                Đưa mã vào camera để điểm danh
                            </DialogTitle>
                            <DialogContent>
                                <div className='w-[500px] h-[480px]'>
                                    <Scanner
                                        styles={{
                                            video: {
                                                width: '100%',
                                                height: '100%',
                                            },
                                        }}
                                        options={{
                                            delayBetweenScanAttempts: 1000,
                                            delayBetweenScanSuccess: 1000,
                                        }}
                                        components={{
                                            tracker: true,
                                        }}
                                        onResult={handleScaner}
                                        onError={handleError}
                                    />
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button size='large' onClick={handleClose}>
                                    Xác nhận
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )}
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
