
import PageTitle from "@/app/lib/components/layout/title";
import { getAccounts } from "@/app/lib/features/accounts/actions/actions";
import AccountAddEditModal from "@/app/lib/features/accounts/components/account-add-edit-modal.client";
import AccountListSkeleton from "@/app/lib/features/accounts/components/account-list-skeleton.server";
import AccountList from "@/app/lib/features/accounts/components/account-list.client";
import { Button } from "@nextui-org/react";
import { Fragment, Suspense } from "react";

export default async function AccountPage() {
    const accounts = getAccounts()

    return (
        <Fragment>
            <PageTitle title={"Accounts"} icon={"payments"} />

            <div className="flex justify-end mb-10 mt-8">

                <AccountAddEditModal
                    launcher={<Button className="bg-primary text-white">Añadir</Button>}
                    defaultValues={{ id: 0, name: '' }} />

            </div>

            <Suspense fallback={<AccountListSkeleton />}>
                <AccountList values={accounts} />
            </Suspense>
        </Fragment>
    )
}
