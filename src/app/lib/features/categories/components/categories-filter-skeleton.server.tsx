
'use client'

import { ButtonGroup, Button, Skeleton } from "@nextui-org/react";


export default function CategoryFilterSkeleton() {

    return (
        <Skeleton className="rounded-lg">
            <ButtonGroup>
                <Button />
                <Button />
            </ButtonGroup>
        </Skeleton>
    )
}