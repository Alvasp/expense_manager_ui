import { Skeleton } from "@nextui-org/react";

export default function ChartContainerSkeleton() {
    return (
        <Skeleton className="rounded-lg">
            <div className="md:col-span-1 col-span-2 min-h-[280px]" />
        </Skeleton>
    )
}