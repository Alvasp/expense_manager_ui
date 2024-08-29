import { IMovement } from "@/app/lib/types/definitions"
import { IByDayMovement } from "../../types/definitions"
import { Fragment } from "react"
import ByDayChart from "./flow-chart.client"
import MovementList from "./movement-list"
import { Card, CardHeader, CardBody } from "@nextui-org/react"

export type FlowViewProps = {
    byDay: IByDayMovement[],
    detail: IMovement[]
}

export default function FlowView({ byDay, detail }: FlowViewProps) {
    return (
        <Fragment>
            <div className="grid grid-cols-2 gap-4">
                <div className="md:col-span-1 col-span-2 min-h-[280px]">
                    <Card className="p-3 mb-3" fullWidth>
                        <CardHeader className="flex gap-3">
                            <div className="flex flex-col">
                                <p className="text-slate-400 font-medium">Movimientos Por Día</p>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <ByDayChart values={byDay} threshold={100000} />
                        </CardBody>
                    </Card>
                </div>
                <MovementList movements={detail} />
            </div>
        </Fragment>
    )
}