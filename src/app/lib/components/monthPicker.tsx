'use client'

import classNames from 'classnames';
import { Popover, PopoverTrigger, PopoverContent, Input, Button } from "@nextui-org/react"
import { Fragment, ReactNode, useState } from "react"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface MonthPickerActiveSelection extends MonthPickerSelection {
    year: number,
}

export interface MonthPickerSelection {
    selectedYear: number,
    selectedMonth: number,
}

export interface MonthPickerProps {
    initialValue: Date,
    onChange?: (selection: MonthPickerSelection) => void,
    min?: number,
    max?: number,
}

const makeDefaultValues = (initialDate: Date): MonthPickerActiveSelection => {
    return {
        year: initialDate.getFullYear(),
        selectedYear: initialDate.getFullYear(),
        selectedMonth: initialDate.getMonth() + 1,
    }
}

export default function MonthPicker({ initialValue, onChange, min, max }: MonthPickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const [value, setValue] = useState<MonthPickerActiveSelection>(makeDefaultValues(initialValue))

    const handleOpen = (open: boolean) => {
        setIsOpen(open);
    }

    const nextYear = () => {
        setValue({ ...value, year: value.year + 1 })
    }

    const previousYear = () => {
        setValue({ ...value, year: value.year - 1 })
    }

    const selectMonth = (month: number) => {
        const next: MonthPickerActiveSelection = {
            ...value,
            selectedYear: value.year,
            selectedMonth: month
        };

        setValue(next);
        setIsOpen(false);

        if (onChange) {
            onChange({ selectedYear: next.selectedYear, selectedMonth: next.selectedMonth });
        }
    }

    return (
        <Fragment>
            <Popover placement="bottom" showArrow offset={10} isOpen={isOpen} onOpenChange={handleOpen} >
                <PopoverTrigger>
                    <Input
                        readOnly
                        type="text"
                        className='cursor-pointer'
                        value={`${months[value.selectedMonth - 1]} ${value.selectedYear}`}
                        endContent={
                            <CalendarMonthIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                </PopoverTrigger>
                <PopoverContent className="w-[250px] h-[320px]">
                    <PrevNextContainer onPrev={previousYear} onNext={nextYear}>
                        <p className="text-lg text-center w-20">{value.year}</p>
                    </PrevNextContainer>
                    <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
                        {months.map((el, idx) =>
                            <div
                                onClick={() => { selectMonth(idx + 1) }}
                                key={idx}
                                className={
                                    classNames('rounded basis-1/4 h-10 flex items-center justify-center text-center px-4 py-2 hover:bg-slate-200 cursor-pointer',
                                        { 'bg-slate-200': idx === value.selectedMonth - 1 }
                                    )}>
                                {el}
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </Fragment >
    )
}

type PrevNextContainerProps = {
    children: ReactNode,
    onNext: () => void,
    onPrev: () => void
}
export function PrevNextContainer({ children, onNext, onPrev }: PrevNextContainerProps) {
    return (
        <div className="flex justify-center items-center mb-8 mt-5 h-15">
            <button className="flex justify-center items-center" onClick={onPrev}>
                <ArrowBackIosIcon fontSize={"small"} />
            </button>
            <div className="flex justify-center items-center">
                {children}
            </div>
            <div className="flex justify-center items-center">
                <ArrowForwardIosIcon fontSize={"small"} onClick={onNext} />
            </div>
        </div>
    )
}