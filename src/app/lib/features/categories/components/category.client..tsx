'use client'

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import CategoryAddEditModal from "./category-add-edit-modal.client";
import CategoryIcon from "@/app/lib/components/categoryIcon";
import { IMovementCategory } from "@/app/lib/types/definitions";

export function CategoryItem({ item }: { item: IMovementCategory }) {
    return (
        <CategoryAddEditModal
            launcher={<div className="md:col-span-1 col-span-6">
                <Card shadow="md" fullWidth className="w-[300px] shadow-2xl transition-transform transform hover:scale-105">
                    <CardHeader className="pb-0 pt-2 px-4 flex-row justify-center items-center">
                        <h4 className="font-bold text-medium upper-case">{item.name}</h4>
                    </CardHeader>
                    <CardBody className="h-[180px] flex flex-row justify-center items-center">
                        <CategoryIcon
                            showContainer={true}
                            icon={item.icon}
                            size={"large"} />
                    </CardBody>
                </Card>
            </div>}
            defaultValues={item} />
    )
}