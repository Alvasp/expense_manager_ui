'use client'

import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, ChartOptions, ChartData, Legend, Tooltip } from 'chart.js'
import { Fragment, useEffect, useState } from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CategoryIconColorDefinition } from "@/app/_lib/types/definitions";
import { ICategorizedMovement } from "../../types/definitions";
Chart.register(ArcElement, Tooltip, Legend);

const defaultDataset = [
    {
        label: 'Categories',
        data: [100],
        backgroundColor: ['rgb(244, 244, 245)'],
        borderWidth: 1,
    }
]

const options: ChartOptions<'doughnut'> = {
    aspectRatio: 1,
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'bottom'
        },
        datalabels: {
            display: true,
            color: 'white'
        }
    },
    cutout: '55%'
}

type CategoryChartState = {
    data: ChartData<'doughnut'>,
    total: number
}

export type CategoryChartProps = {
    categorizedMovements: ICategorizedMovement[],
}

const CategoryChart: React.FC<CategoryChartProps> = ({ categorizedMovements }) => {
    const [data, setData] = useState<CategoryChartState>({
        data: {
            datasets: defaultDataset
        },
        total: 0
    });

    useEffect(() => {
        if (!categorizedMovements?.length) {
            setData({ data: { labels: ['no data'], datasets: defaultDataset }, total: 0 })
            return;
        }

        let total = 0, labels: string[] = [], values: number[] = [], colors: string[] = [];

        categorizedMovements.forEach(el => {
            total += el.subtotal;
            labels.push(el.category.name);
            values.push(el.percentage);
            colors.push(CategoryIconColorDefinition.get(el.category.icon)!);
        });

        setData(
            {
                total,
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Categories',
                            data: values,
                            backgroundColor: colors,
                            borderWidth: 1,
                        },
                    ],
                }
            }
        )

    }, [categorizedMovements]);

    return (
        <Fragment>
            <div className="max-h-[350px] flex justify-center">
                {/* {data.total > 0 && <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Chip
                        color={type === 'income' ? 'primary' : 'danger'}
                        variant="light"
                        size="lg">{formatCurrency(data.total)}</Chip>
                </div>} */}
                <Doughnut options={options} data={data.data} plugins={[]} />
            </div>
        </Fragment>
    );
}

export default CategoryChart;
