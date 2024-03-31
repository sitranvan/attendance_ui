import axios, { AxiosError, HttpStatusCode } from 'axios'

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => axios.isAxiosError(error)

// Error 422
export const isAxiosUnprocessableEntity = <FormError>(error: unknown): error is AxiosError<FormError> =>
    isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity

export const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const formattedMonth = month < 10 ? `0${month}` : `${month}`
    const formattedDay = day < 10 ? `0${day}` : `${day}`

    return `${formattedDay}/${formattedMonth}/${year}`
}

function addLeadingZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`
}

// Extract date time from a string to format: dd/MM/yyyy - HH:mm:ss
export const extractDateTimeFull = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString)
    const year = dateTime.getFullYear()
    const month = addLeadingZero(dateTime.getMonth() + 1) // Lưu ý rằng getMonth() trả về từ 0 đến 11
    const day = addLeadingZero(dateTime.getDate())
    const hour = addLeadingZero(dateTime.getHours())
    const minute = addLeadingZero(dateTime.getMinutes())
    const second = addLeadingZero(dateTime.getSeconds())

    return `${day}/${month}/${year} - ${hour}:${minute}:${second}`
}

// Check có bằng ngày hiện tại hay không
export const isSameDay = (dateTimeString: string): boolean => {
    const inputDateTime = new Date(dateTimeString)
    const currentDateTime = new Date()

    // Lấy phần nguyên của ngày, tháng và năm
    const inputDate = new Date(inputDateTime.getFullYear(), inputDateTime.getMonth(), inputDateTime.getDate())
    const currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate())

    // So sánh ngày, tháng và năm của hai đối tượng Date
    return inputDate.getTime() === currentDate.getTime()
}

export const isDateBeforeToday = (dateTimeString: string): boolean => {
    const inputDateTime = new Date(dateTimeString)
    const currentDateTime = new Date()

    // Lấy phần nguyên của ngày, tháng và năm
    const inputDate = new Date(inputDateTime.getFullYear(), inputDateTime.getMonth(), inputDateTime.getDate())
    const currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate())

    // So sánh ngày, tháng và năm của hai đối tượng Date
    return inputDate.getTime() < currentDate.getTime()
}

// So sánh active khi có id lỗi (so sánh /attendance/6603d082191b5d72dcecb294/today và /attendance/:id/today )
export const comparePaths = (path1: string, path2: string) => {
    // Tách các phần tử của đường dẫn thành mảng
    const path1Parts = path1.split('/')
    const path2Parts = path2.split('/')

    // So sánh từng phần tử của mảng để tìm phần cụ thể của :id và loại bỏ nó
    for (let i = 0; i < path1Parts.length; i++) {
        // Kiểm tra nếu cả hai phần tử cùng có giá trị là ":id"
        if (path1Parts[i] === path2Parts[i] && path1Parts[i] === ':id') {
            // Thay thế phần tử ":id" trong path1Parts và path2Parts thành một chuỗi rỗng
            path1Parts[i] = ''
            path2Parts[i] = ''
        }
    }

    // Ghép lại các phần tử của mảng thành đường dẫn mới
    const updatedPath1 = path1Parts.join('/')
    const updatedPath2 = path2Parts.join('/')

    // Kiểm tra xem hai đường dẫn đã được loại bỏ phần cụ thể của :id có giống nhau không
    return updatedPath1 === updatedPath2
}
