import { CategoryIconEnum } from "@/app/_lib/types/definitions";
import { CategoryItem } from "./category.client.";
import { Skeleton } from "@nextui-org/react";

export default function CategoryListSkeleton() {
    return (
        <div className="grid md:grid-cols-5 grid-cols-1 gap-4">
            {Array.from({ length: 5 }).map((el, idx) => <Skeleton key={idx} className="rounded-lg">
                <CategoryItem
                    item={
                        {
                            id: idx,
                            name: '',
                            icon: CategoryIconEnum.account_balance,
                            type: { id: 1, name: '' }
                        }}
                /></Skeleton>)}
        </div>
    )
}

