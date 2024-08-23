'use client'

import { createContext, ReactNode, use, useContext, useEffect, useRef, } from "react";
import { useStore } from 'zustand'
import { createDashboardStore, DashboardStore, IDashboardStoreState } from "./store";

export type DashboardStoreApi = ReturnType<typeof createDashboardStore>

export const DashboardStoreContext = createContext<DashboardStoreApi | undefined>(
    undefined,
)

export interface IDashboardStoreProviderProps {
    children: ReactNode,
    valuesProm?: Promise<IDashboardStoreState>
}

export default function DashboardStoreProvider({ children, valuesProm }: IDashboardStoreProviderProps) {
    let values: IDashboardStoreState | undefined = undefined;

    if (valuesProm) {
        values = use(valuesProm)
    }

    const storeRef = useRef<DashboardStoreApi>(createDashboardStore(values))

    return (
        <DashboardStoreContext.Provider
            value={storeRef.current}>
            {children}
        </DashboardStoreContext.Provider>
    )
}

export const useDashboardStore = <T,>(
    selector: (store: DashboardStore) => T,
): T => {
    const dashboardStoreContext = useContext(DashboardStoreContext)

    if (!dashboardStoreContext) {
        throw new Error(`dashboardStore must be used within dashboardProvider`)
    }

    return useStore(dashboardStoreContext, selector)
}