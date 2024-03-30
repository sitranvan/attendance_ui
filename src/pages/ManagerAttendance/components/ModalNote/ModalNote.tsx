import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useQuery } from '@tanstack/react-query'
import React, { Fragment } from 'react'
import attendanceApi from '~/apis/attendance.api'

interface ModalNoteProps {
    open: boolean
    handleClose: () => void
    onSubmit: (note: string) => void // onSubmit function accepting a note string parameter
    dataNote: { user_id: string; attendance_id: string }
}

export default function ModalNote({ open, handleClose, onSubmit, dataNote }: ModalNoteProps) {
    const [noteValue, setNoteValue] = React.useState('')
    const { user_id, attendance_id } = dataNote

    const { data } = useQuery({
        queryKey: ['getAttendanceDetailByUser', user_id, attendance_id],
        queryFn: () => attendanceApi.getAttendanceDetailByUser(attendance_id, user_id),
        enabled: open,
    })
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(noteValue)
        handleClose()
    }

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle>Ghi chú</DialogTitle>
                <DialogContent sx={{ width: '500px' }}>
                    {data?.data.data.note ? (
                        <DialogContentText>{data?.data.data.note}</DialogContentText>
                    ) : (
                        <DialogContentText>Chưa có ghi chú gì</DialogContentText>
                    )}

                    <TextField
                        required
                        margin='dense'
                        id='note'
                        name='note'
                        label='Note'
                        type='text'
                        fullWidth
                        variant='standard'
                        value={noteValue}
                        onChange={(e) => setNoteValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Đóng</Button>
                    <Button type='submit'>Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
