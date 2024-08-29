'use client'

import { use } from "react"
import { AccountItem } from "./account.client."
import { IAccountBalance } from "@/app/lib/types/definitions"

export type AccountListProps = {
    values: Promise<IAccountBalance[]>
}

export default function AccountList({ values }: AccountListProps) {
    const vals = use(values)

    return (
        <div className="grid md:grid-cols-5 grid-cols-1 gap-4">
            {vals.map((el, idx) => <AccountItem key={idx} item={el} />)}
        </div>
    )
}