import { IAccount, IMovementCategory, IMovementType } from '@/app/lib/types/definitions'
import moment from 'moment'
import { createStore } from 'zustand/vanilla'

type DashboardCriteria = {
    year: number,
    month: number
}

export type IDashboardStoreState = {
    categories: IMovementCategory[],
    movementTypes: IMovementType[],
    accounts: IAccount[],
    criteria?: DashboardCriteria
}

export type IDashboardStoreActions = {
    setCategories: (categories: IMovementCategory[]) => void,
    setMovementTypes: (movementTypes: IMovementType[]) => void,
    setDashboardCriteria: (criteria: DashboardCriteria) => void
}

export type DashboardStore = IDashboardStoreState & IDashboardStoreActions

export const defaultInitState: IDashboardStoreState = {
    categories: [],
    movementTypes: [],
    accounts: []
}

export const createDashboardStore = (
    initState: IDashboardStoreState = defaultInitState
) => {
    return createStore<DashboardStore>()((set) => ({
        ...initState,
        setCategories: (categories) => set((state) => {
            return ({
                ...state,
                categories: categories,
            })
        }),
        setMovementTypes: (movementTypes) => set((state) => {
            return {
                ...state,
                movementTypes: movementTypes
            }
        }),
        setDashboardCriteria: (criteria) => set((state) => {
            return {
                ...state,
                criteria
            }
        })
    }));
}

