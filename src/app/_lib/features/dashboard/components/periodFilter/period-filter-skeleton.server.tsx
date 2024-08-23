import MonthPicker from "@/app/_lib/components/monthPicker";
import { Skeleton } from "@nextui-org/react";

export default function PeriodFilterSkeleton() {
    return (
        <Skeleton className="rounded-lg">
            <MonthPicker initialValue={new Date()} />
        </Skeleton>
    )
}