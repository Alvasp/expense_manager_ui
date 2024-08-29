import MonthPicker from "@/app/lib/components/monthPicker";
import { Skeleton } from "@nextui-org/react";

export default function PeriodFilterSkeleton() {
    return (
        <Skeleton className="rounded-lg w-[300px]">
            <MonthPicker initialValue={new Date()} />
        </Skeleton>
    )
}