import { capitalize } from "lodash"
import moment from "moment"

export function formatCurrency(value: number): string {
    return `$ ${formatNumber(value)}`
}

export function formatNumber(value: number): string {
    return `${value.toLocaleString().replaceAll(',', '.')}`
}

export function capitalizePhrase(value: string): string {
    return value.split(' ').map(el => capitalize(el)).join(' ')
}

export function formatDate(value: Date) {
    return moment(value).format('DD/MM/yyyy')
}