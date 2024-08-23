import { ReactNode, Suspense } from "react";
import { getCategories, getMovementTypes } from "../../_lib/features/categories/actions/actions";
import { IDashboardStoreState } from "../../_lib/features/dashboard/store/store";
import DashboardStoreProvider from "../../_lib/features/dashboard/store/storeProvider";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const storeData = Promise.all([getCategories(), getMovementTypes()]).then(res => {
        const state: IDashboardStoreState = {
            categories: res[0],
            movementTypes: res[1],
        }

        return state;
    })

    return (
        <Suspense fallback={'Initializing...'}>
            <DashboardStoreProvider valuesProm={storeData}>
                {children}
            </DashboardStoreProvider>
        </Suspense>
    )
}