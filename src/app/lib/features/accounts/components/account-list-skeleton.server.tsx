import { Skeleton } from "@nextui-org/react";
import { AccountItem } from "./account.client.";

export default function AccountListSkeleton() {
    return (
        <div className="grid md:grid-cols-5 grid-cols-1 gap-4">
            {Array.from({ length: 5 }).map((el, idx) => <Skeleton key={idx} className="rounded-lg">
                <AccountItem
                    item={
                        {
                            account: {
                                id: 0,
                                name: ''
                            },
                            balance: 0
                        }}
                /></Skeleton>)}
        </div>
    )
}

