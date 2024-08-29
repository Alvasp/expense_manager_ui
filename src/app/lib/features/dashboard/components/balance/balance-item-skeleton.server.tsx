import { Skeleton } from "@nextui-org/react";

export default function BalanceItemSkeleton() {
    return (
        <Skeleton className="rounded-lg w-3/5" >
            <h1 className="text-4xl font-extrabold">.</h1>
        </Skeleton>
    )
}