import { format, parseISO } from 'date-fns'

export function formatDateDDMMYYYY(date: string) {
    const dateISO = parseISO(date)
    return format(dateISO, 'dd/MM/yyyy')
}