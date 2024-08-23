import usePagination from "@/app/_lib/hooks/usePagination"
import { IMovement } from "@/app/_lib/types/definitions"
import { formatCurrency, formatDate } from "@/app/_lib/utils/format-utils"
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip, Input, Tooltip } from "@nextui-org/react"
import { Fragment, useState } from "react"
import Icon from '@mui/material/Icon';
import AddEditMovementModal from "../addEditMovement/movement-add-edit-modal.client"
import { useFilter } from "@/app/_lib/hooks/useFilter"
import classNames from "classnames"

const pageSize = 10;

export type MovementListProps = {
    movements: IMovement[],
    showBack?: boolean,
    onBack?: () => void
}

export default function MovementList({ movements, showBack = false, onBack }: MovementListProps) {
    const [filterWord, setFilterWord] = useState<string | undefined>()

    const { filteredItems } = useFilter<IMovement>(movements, "title", filterWord)

    const { totalPages, currentPage, items, setPage } = usePagination(filteredItems, pageSize);

    return (
        <Table aria-label="movement details table"
            className={'min-h-100'}
            topContent={
                <div className="flex flex-col gap-4">
                    <div className={classNames("flex gap-3 items-end", { "justify-end": !showBack, 'justify-between': showBack })}>
                        {showBack &&
                            <Tooltip content={'go back'}>
                                <Button color='secondary' isIconOnly onClick={onBack}><Icon>reply</Icon></Button>
                            </Tooltip>
                        }

                        <Input
                            isClearable
                            onClear={() => { setFilterWord(undefined) }}
                            onChange={(e) => { setFilterWord(e.target.value) }}
                            className="w-full sm:max-w-[44%]"
                            placeholder="Search by movement name..."
                        />
                    </div>
                </div>
            }
            bottomContent={
                <Fragment>
                    {movements.length > pageSize && <div className="flex justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={currentPage}
                            total={totalPages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>}
                </Fragment >
            }>
            <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Category</TableColumn>
                <TableColumn>Amount</TableColumn>
                <TableColumn>Recurrent</TableColumn>
                <TableColumn>Date</TableColumn>
                <TableColumn>Actions</TableColumn>

            </TableHeader>
            <TableBody emptyContent={"No rows to display"}>
                {
                    items.map(mov =>
                        <TableRow key={mov.id}>
                            <TableCell>{mov.title}</TableCell>
                            <TableCell>{mov.category.name}</TableCell>
                            <TableCell>{formatCurrency(mov.amount)}</TableCell>
                            <TableCell>{mov.recurrent ? 'Sí' : 'No'}</TableCell>
                            <TableCell>{formatDate(mov.dateStart)}</TableCell>
                            <TableCell className="flex justify-center">
                                <AddEditMovementModal movement={mov} launcher={<Tooltip content={'view details'}><Icon>search</Icon></Tooltip>} />
                            </TableCell>
                        </TableRow>
                    )}
            </TableBody>
        </Table>
    )
}