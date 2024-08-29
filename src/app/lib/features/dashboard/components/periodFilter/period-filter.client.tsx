'use client'

import MonthPicker, { MonthPickerSelection } from "@/app/lib/components/monthPicker";
import { IDashboardPageCriteria } from "../../types/definitions";
import { use } from "react";
import { useRouter } from "next/navigation";

export type PeriodFilterProps = {
    criteria: IDashboardPageCriteria,
    data: Promise<any>
}

export default function PeriodFilter({ criteria, data }: PeriodFilterProps) {
    use(data)

    const { year, month } = criteria

    const router = useRouter();

    const handlePeriodChange = (selection: MonthPickerSelection) => {
        const { selectedYear, selectedMonth } = selection
        if (criteria.year !== selectedYear || criteria.month !== selectedMonth) {
            router.replace(`/dashboard/period/${selectedYear}${selectedMonth.toString().padStart(2, '0')}`)
        }
    }

    return (
        <div className="md:w-[300px] w-full cursor-pointer">
            <MonthPicker initialValue={new Date(year, month - 1)} onChange={handlePeriodChange} />
        </div>
    )
}