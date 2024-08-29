'use client'

import { IMovementCategory } from "@/app/lib/types/definitions"
import { use } from "react"
import { CategoryItem } from "./category.client."

export type CategoryListProps = {
    values: Promise<IMovementCategory[]>
}

export default function CategoryList({ values }: CategoryListProps) {
    const vals = use(values)

    return (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
            {vals.filter(el => !el.system).map((el) => <CategoryItem key={el.id} item={el} />)}
        </div>
    )
}