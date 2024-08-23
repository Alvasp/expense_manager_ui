export type CategoryViewType = 'incomes' | 'expenses'

export const categoryViewTypes: CategoryViewType[] = ['incomes', 'expenses']

export interface IDashboardPageCriteria {
    viewType: CategoryViewType
}