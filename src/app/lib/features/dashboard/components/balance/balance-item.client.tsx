'use client'

import { formatCurrency } from "@/app/lib/utils/format-utils";
import { BalanceItems } from "./balance.server";
import { use } from "react";

export type BalanceItemProps = {
    data: Promise<BalanceItems>,
    type: keyof BalanceItems
}

export default function BalanceItem({ data, type }: BalanceItemProps) {
    const value = use(data);

    return (
        <h1 className="text-4xl font-extrabold">{formatCurrency(value[type])}</h1>
    )
}

