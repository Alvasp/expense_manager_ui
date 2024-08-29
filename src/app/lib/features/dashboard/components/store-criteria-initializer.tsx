'use client'

import { ReactNode, useEffect } from "react"
import { IDashboardPageCriteria } from "../types/definitions"
import { useDashboardStore } from "../store/storeProvider"
import { isEqual } from "lodash"

export type StoreCriteriaInitializerProps = {
    children: ReactNode,
    criteria: IDashboardPageCriteria
}
export default function StoreCriteriaInitializer({ children, criteria }: StoreCriteriaInitializerProps) {
    const { criteria: _criteria, setDashboardCriteria } = useDashboardStore((state) => state)

    useEffect(() => {
        if (!isEqual(criteria, _criteria)) {
            setDashboardCriteria(criteria)
        }
    }, [JSON.stringify(criteria)])

    return children
}