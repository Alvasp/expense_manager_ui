'use client'

import { capitalizePhrase } from "@/app/lib/utils/format-utils"
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react"
import { DashboardViewType } from "../../types/definitions"
import Icon from '@mui/material/Icon';


const filters: DashboardViewType[] = ['income overview', 'expense overview', 'income flow', 'expense flow']

export type ViewFilterProps = {
    value: DashboardViewType,
    onChange: (selection: DashboardViewType) => void
}

export default function ViewFilter({ value, onChange }: ViewFilterProps) {
    const handleFilterChange = (_value: DashboardViewType) => {
        if (_value !== value) {
            onChange(_value)
        }
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button color="primary" className="text-center" endContent={<Icon>arrow_drop_down</Icon>} >
                    {capitalizePhrase(value)}
                </Button>
            </DropdownTrigger>
            <DropdownMenu className="capitalize text-center" >
                {filters.map((el) => <DropdownItem
                    key={el}
                    onClick={() => { handleFilterChange(el) }}>
                    {el}</DropdownItem>)}
            </DropdownMenu>
        </Dropdown>
    )
}