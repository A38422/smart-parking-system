import moment from 'moment'

const formatDateLocal = (value) => {
    return moment(value).format('DD/MM/YYYY')
}

const convertDateTimeToDatePicker = (dateString) => {
    if (!dateString || dateString === '') {
        return ''
    }

    const dateParts = dateString.split('/')
    const day = parseInt(dateParts[0], 10)
    const month = parseInt(dateParts[1], 10)
    const year = parseInt(dateParts[2], 10)
    const date = new Date(year, month - 1, day)

    const convertedDay = date.getDate()
    const convertedMonth = date.getMonth() + 1
    const convertedYear = date.getFullYear()

    return (
        convertedYear +
        '-' +
        (convertedMonth < 10 ? '0' + convertedMonth : convertedMonth) +
        '-' +
        (convertedDay < 10 ? '0' + convertedDay : convertedDay)
    )
}

export { formatDateLocal, convertDateTimeToDatePicker }
