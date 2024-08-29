'use client'

import { DashboardColors } from "@/app/lib/types/definitions";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { use, useEffect, useState } from "react";
import { CategoryScale, Chart, ChartData, ChartOptions, LinearScale, LineElement, PointElement } from "chart.js";
import { Line, } from "react-chartjs-2";
import { IByDayMovement } from "../../types/definitions";
Chart.register(LinearScale, CategoryScale, PointElement, LineElement);

const options: ChartOptions<'line'> =
{
    aspectRatio: .4,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false,
            position: 'left'
        },
    },
};

export type Period = {
    year: number,
    month: number
}

export type ChartContainerProps = {
    values: IByDayMovement[],
    threshold: number
}

export default function ByDayChart({ values, threshold }: ChartContainerProps) {

    const [data, setData] = useState<ChartData<'line'>>({
        datasets: []
    });

    useEffect(() => {
        let _labels: string[] = [], _values: number[] = [], _colors: string[] = [];

        values.forEach(el => {
            _labels.push(el.day.toString());
            _values.push(el.subtotal);
            _colors.push(el.subtotal > threshold ? DashboardColors.at(0)! : DashboardColors.at(1)!);
        });

        setData(
            {
                labels: _labels,
                datasets: [
                    {
                        label: 'Days',
                        data: _values,
                        backgroundColor: _colors,
                        borderWidth: 1,
                        tension: .5
                    },
                ],
            }
        )
    }, [values]);

    return <Line options={options} data={data} plugins={[]} />

}