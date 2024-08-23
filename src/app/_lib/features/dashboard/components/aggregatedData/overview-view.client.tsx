'use client'

import { Fragment } from "react"
import CategoryList from "./category-list.client"
import { ICategorizedMovement } from "../../types/definitions"
import CategoryChart from "./category-chart.client"
import { Card, CardHeader, CardBody } from "@nextui-org/react"



export type OverviewView = {
    data: ICategorizedMovement[]
}

export default function OverviewView({ data }: OverviewView) {
    return (
        <Fragment>
            <div className="grid grid-cols-2 gap-4">

                <div className="md:col-span-1 col-span-2 min-h-[280px]">
                    <Card className="p-3 mb-3" fullWidth>
                        <CardHeader className="flex gap-3">
                            <div className="flex flex-col">
                                <p className="text-slate-400 font-medium capitalize">Movements Distribution</p>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <CategoryChart categorizedMovements={data} />
                        </CardBody>
                    </Card>
                </div>
                <div className="md:col-span-1 col-span-2 min-h-[280px]">
                    <CategoryList values={data} />
                </div>

            </div>
        </Fragment>
    )
}