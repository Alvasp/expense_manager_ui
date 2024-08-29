import { getAccounts } from "@/app/lib/features/accounts/actions/actions";
import { getCategories, getMovementTypes } from "@/app/lib/features/categories/actions/actions";
import { IDashboardStoreState } from "@/app/lib/features/dashboard/store/store";
import DashboardStoreProvider from "@/app/lib/features/dashboard/store/storeProvider";
import { ReactNode, Suspense } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const storeData = Promise.all([getCategories(), getMovementTypes(), getAccounts()]).then(res => {
        const state: IDashboardStoreState = {
            categories: res[0],
            movementTypes: res[1],
            accounts: res[2].map(el => el.account)
        }

        return state;
    })

    return (
        <Suspense fallback={null}>
            <DashboardStoreProvider valuesProm={storeData}>
                {children}
            </DashboardStoreProvider>
        </Suspense>
    )
}