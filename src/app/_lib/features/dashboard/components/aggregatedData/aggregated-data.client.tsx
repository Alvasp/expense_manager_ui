'use client'

import { fetchMovementResp } from "@/app/_lib/database/movements-repository"
import { Fragment, use, useEffect, useState } from "react";
import { DashboardViewType, IByDayMovement, ICategorizedMovement, IDashboardPageCriteria } from "../../types/definitions";
import ViewFilter from "./view-filter.client";
import OverviewView from "./overview-view.client";
import FlowView from "./flow-view.client";
import { IMovement } from "@/app/_lib/types/definitions";
import { isEqual } from "lodash";
import { MovementPlainToClass } from "@/app/_lib/utils/model-util";
import moment from "moment";

type Period = { year: number, month: number }

type FlowData = IByDayMovement[]

type CategorizedData = ICategorizedMovement[]

type AggregatedDataState = {
    expenseFlow: FlowData,
    incomeFlow: FlowData,
    expenseOverview: CategorizedData,
    incomeOverview: CategorizedData
}

const defaultData: AggregatedDataState = {
    expenseFlow: [],
    incomeFlow: [],
    expenseOverview: [],
    incomeOverview: []
}

export type AggregatedDataProps = {
    criteria: IDashboardPageCriteria
    dataPromise: Promise<fetchMovementResp>
}

export default function AggregatedData({ criteria, dataPromise }: AggregatedDataProps) {
    const _values = use(dataPromise);

    const [viewType, setViewType] = useState<DashboardViewType>('expense overview')

    const [data, setData] = useState<AggregatedDataState>(defaultData)

    useEffect(() => {
        const { incomes, expenses } = _values

        setData({
            expenseFlow: aggregateByDay(expenses, criteria),
            incomeFlow: aggregateByDay(incomes, criteria),
            expenseOverview: aggregateByCategory(expenses),
            incomeOverview: aggregateByCategory(incomes)
        });

    }, [_values])

    return (
        <Fragment>
            <div className="mb-5 flex justify-end">
                <ViewFilter value={viewType} onChange={setViewType} />
            </div>
            <div>
                {viewType === 'expense overview' && <OverviewView data={data.expenseOverview} />}
                {viewType === 'income overview' && <OverviewView data={data.incomeOverview} />}
                {viewType === 'expense flow' && <FlowView byDay={data.expenseFlow} detail={_values.expenses} />}
                {viewType === 'income flow' && <FlowView byDay={data.incomeFlow} detail={_values.incomes} />}
            </div>
        </Fragment>
    )
}

function aggregateByCategory(movements: IMovement[]): ICategorizedMovement[] {
    const total = movements.reduce((prev, curr) => prev + curr.amount, 0)

    return movements.reduce((prev, curr) => {
        const match = prev.findIndex(el => isEqual(el.category, curr.category));

        if (match > -1) {
            prev[match].movements.push(curr);
            prev[match].subtotal += curr.amount;
            prev[match].percentage = Math.round((prev[match].subtotal / total) * 100)
        } else {
            prev.push({
                category: curr.category,
                movements: [curr],
                subtotal: curr.amount,
                percentage: Math.round((curr.amount / total) * 100)
            })
        }

        return prev;
    }, new Array<ICategorizedMovement>());
}

function aggregateByDay(movements: IMovement[], period: Period): IByDayMovement[] {
    const daysInPeriod = moment(`${period.year}-${period.month}`, 'YYYY-MM').endOf('month').daysInMonth();

    const _mov = movements.map(el => MovementPlainToClass(el))

    const collection: IByDayMovement[] = [];

    for (let i = 1; i <= daysInPeriod; i++) {
        const byDay = _mov.filter(el => el.dateStart.getDate() === i)

        collection.push(
            {
                day: i,
                movements: byDay,
                subtotal: byDay.reduce((p, c) => p + c.amount, 0)
            }
        )
    }

    return collection;
}