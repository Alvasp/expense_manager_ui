
'use client'

import { ButtonGroup, Button } from "@nextui-org/react";
import { CategoryViewType, categoryViewTypes } from "../types/definitions";
import { useRouter } from "next/navigation";
import { use } from "react";

export type CategoryFilterProps = {
    dataProm: Promise<any>,
    selectedFilter: CategoryViewType
}

export default function CategoryFilter({ dataProm, selectedFilter }: CategoryFilterProps) {
    const _ready = use(dataProm)
    const router = useRouter();

    const handleChange = (next: CategoryViewType) => {
        if (selectedFilter !== next) {
            router.replace(`/categories/${next}`)
        }
    }

    return (
        <ButtonGroup>
            <Button
                onClick={() => { handleChange('incomes') }}
                color={selectedFilter === 'incomes' ? 'primary' : 'default'}>
                Incomes
            </Button>
            <Button
                onClick={() => { handleChange('expenses') }}
                color={selectedFilter === 'expenses' ? 'primary' : 'default'}>
                Expenses
            </Button>
        </ButtonGroup>
    )
}