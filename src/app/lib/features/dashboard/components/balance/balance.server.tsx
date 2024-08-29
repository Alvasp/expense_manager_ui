import { Card, CardHeader, CardBody } from "@nextui-org/react";
import BalanceItem from "./balance-item.client";
import { fetchMovementResp } from "@/app/lib/database/movements-repository";
import { Suspense } from "react";
import BalanceItemSkeleton from "./balance-item-skeleton.server";
import { IDashboardPageCriteria } from "../../types/definitions";
import { fetchMovements } from "../../actions/actions";

export type BalanceItems = {
    total: number,
    incomes: number,
    expenses: number
}

export type BalanceProps = {
    dataPromise: Promise<fetchMovementResp>
}

export default async function Balance({ dataPromise }: BalanceProps) {

    const _data = dataPromise.then(res => {
        const out = {
            total: 0,
            incomes: 0,
            expenses: 0
        };

        [...res.incomes, ...res.expenses].forEach(el => {
            if (el.category.type.id === 1) {
                out.total += el.amount
                out.incomes += el.amount;
            } else {
                out.total -= el.amount
                out.expenses += el.amount;
            }
        })

        return out;
    })

    return (
        <div className="grid grid-cols-3 gap-4">
            <Card className="col-span-3 md:col-span-1 p-3">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-slate-400 font-medium">Total Balance</p>
                    </div>
                </CardHeader>
                <CardBody className="flex justify-content">
                    <Suspense fallback={<BalanceItemSkeleton />}>
                        <BalanceItem data={_data} type="total" />
                    </Suspense>
                </CardBody>
            </Card>

            <Card className="col-span-3 md:col-span-1 p-3">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-slate-400 font-medium">Total Incomes</p>
                    </div>
                </CardHeader>
                <CardBody className="flex justify-content">
                    <Suspense fallback={<BalanceItemSkeleton />}>
                        <BalanceItem data={_data} type="incomes" />
                    </Suspense>
                </CardBody>
            </Card>

            <Card className="col-span-3 md:col-span-1 p-3">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-slate-400 font-medium">Total Expenses</p>
                    </div>
                </CardHeader>
                <CardBody className="flex justify-content">
                    <Suspense fallback={<BalanceItemSkeleton />}>
                        <BalanceItem data={_data} type="expenses" />
                    </Suspense>
                </CardBody>
            </Card>
        </div>
    )
}

async function buildBalance(criteria: IDashboardPageCriteria): Promise<BalanceItems> {
    const { year, month } = criteria;

    const movements = await fetchMovements(year, month)

    const out = {
        total: 0,
        incomes: 0,
        expenses: 0
    };

    [...movements.incomes, ...movements.expenses].forEach(el => {
        if (el.category.type.id === 1) {
            out.total += el.amount
            out.incomes += el.amount;
        } else {
            out.total -= el.amount
            out.expenses += el.amount;
        }
    })

    return out;
}