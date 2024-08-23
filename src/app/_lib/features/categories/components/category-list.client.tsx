'use client'

import { IMovementCategory } from "@/app/_lib/types/definitions"
import { use } from "react"
import { CategoryItem } from "./category.client."

export type CategoryListProps = {
    values: Promise<IMovementCategory[]>
}

export default function CategoryList({ values }: CategoryListProps) {
    const vals = use(values)

    return (
        <div className="grid md:grid-cols-5 grid-cols-1 gap-4">
            {vals.map((el) => <CategoryItem key={el.id} item={el} />)}
        </div>
    )
}