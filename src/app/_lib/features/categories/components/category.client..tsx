'use client'

import CategoryIcon from "@/app/_lib/components/categoryIcon";
import { IMovementCategory } from "@/app/_lib/types/definitions";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import CategoryAddEditModal from "./category-add-edit-modal.client";

export function CategoryItem({ item }: { item: IMovementCategory }) {
    return (
        <CategoryAddEditModal
            launcher={
                <div className="md:col-span-1 col-span-5">
                    <Card shadow="md" fullWidth>
                        <CardHeader className="pb-0 pt-2 px-4 flex-row justify-center items-center">
                            <h4 className="font-bold text-medium upper-case">{item.name}</h4>
                        </CardHeader>
                        <CardBody className="h-[180px] flex flex-row justify-center items-center">
                            <CategoryIcon
                                showContainer={true}
                                icon={item.icon}
                                size={"large"} />
                        </CardBody>
                    </ Card>
                </div>
            }
            defaultValues={item} />
    )
}