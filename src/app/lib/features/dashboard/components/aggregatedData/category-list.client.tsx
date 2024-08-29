'use client'

import CategoryIcon from "@/app/lib/components/categoryIcon"
import usePagination from "@/app/lib/hooks/usePagination"
import { IMovement, IMovementCategory } from "@/app/lib/types/definitions"
import { formatCurrency } from "@/app/lib/utils/format-utils"
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from "@nextui-org/react"
import { Fragment, useEffect, useState } from "react"
import MovementList from "./movement-list"
import Icon from '@mui/material/Icon';
import { ICategorizedMovement } from "../../types/definitions"
import { useFilter } from "@/app/lib/hooks/useFilter"

const pageSize = 10;

type DetailViewType = {
    isOpen: boolean,
    detail?: IMovement[],
    category?: IMovementCategory
}

export type ListContainerProps = {
    values: ICategorizedMovement[]
}

export default function CategoryList({ values }: ListContainerProps) {
    const [isDetailOpen, setIsDetailOpen] = useState<DetailViewType>({ isOpen: false })

    const [filterWord, setFilterWord] = useState<string | undefined>()

    const { filteredItems } = useFilter<ICategorizedMovement>(values, "category.name", filterWord)

    const { totalPages, currentPage, items, setPage } = usePagination(filteredItems, pageSize);

    useEffect(() => {
        if (isDetailOpen.isOpen) {
            setIsDetailOpen({
                ...isDetailOpen,
                detail: values.find(el => el.category.id === isDetailOpen.category?.id)?.movements
            })
        }
    }, [values])

    return (
        <div className="md:col-span-1 col-span-2 min-h-[280px]">
            {!isDetailOpen.isOpen ?

                <Table title="Movemens By Category" aria-label="CategorizedMovement table"
                    topContent={
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-end gap-3 items-end">
                                <Input
                                    isClearable
                                    onClear={() => { setFilterWord(undefined) }}
                                    onChange={(e) => { setFilterWord(e.target.value) }}
                                    className="w-full sm:max-w-[44%]"
                                    placeholder="Search by category..."
                                />
                            </div>
                        </div>
                    }
                    bottomContent={
                        <Fragment>
                            {
                                values.length > pageSize && <div className="flex justify-center">
                                    <Pagination
                                        isCompact
                                        showControls
                                        showShadow
                                        color="secondary"
                                        page={currentPage}
                                        total={totalPages}
                                        onChange={(page) => setPage(page)}
                                    />
                                </div>
                            }
                        </Fragment >
                    }>
                    <TableHeader>
                        <TableColumn> </TableColumn>
                        <TableColumn>Category</TableColumn>
                        <TableColumn>Subtotal</TableColumn>
                        <TableColumn>Transactions</TableColumn>
                        <TableColumn>Percentage</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No transactions to display"}>
                        {items.map(el => <TableRow
                            key={el.category.id}
                            onClick={() => { setIsDetailOpen({ isOpen: true, category: el.category, detail: el.movements }) }}>
                            <TableCell width={10}>
                                <CategoryIcon icon={el.category.icon} showContainer size="medium" />
                            </TableCell>
                            <TableCell>
                                {el.category.name}
                            </TableCell>
                            <TableCell>
                                {formatCurrency(el.subtotal)}
                            </TableCell>
                            <TableCell>
                                {el.movements.length}
                            </TableCell>
                            <TableCell>
                                {`${el.percentage}%`}
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table >
                :
                <MovementList
                    movements={isDetailOpen.detail ?? []}
                    showBack
                    onBack={() => { setIsDetailOpen({ isOpen: false }) }} />
            }
        </div>
    )
}