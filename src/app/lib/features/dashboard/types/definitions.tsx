import { IMovementCategory, IMovement } from "@/app/lib/types/definitions"

export type DashboardViewType = 'income overview' | 'expense overview' | 'income flow' | 'expense flow'
export const dashboardViewTypes: DashboardViewType[] = ['income overview', 'expense overview', 'income flow', 'expense flow']

export interface IDashboardPageCriteria {
    year: number,
    month: number
}

export interface ICategorizedMovement {
    category: IMovementCategory,
    subtotal: number,
    percentage: number,
    movements: IMovement[]
}

export interface IByDayMovement {
    day: number,
    subtotal: number,
    movements: IMovement[]
}
