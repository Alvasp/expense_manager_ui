'use client'

import { ScrollShadow, Tooltip } from "@nextui-org/react";
import CategoryIcon from "../categoryIcon";
import { CategoryIconEnum } from "../../types/definitions";
import classNames from "classnames";
import styles from './styles.module.css'

export type IconPickerProps = {
    value: CategoryIconEnum,
    onChange: (icon: CategoryIconEnum) => void
}

export default function IconPicker({ value, onChange }: IconPickerProps) {

    return (
        <ScrollShadow className="h-[250px]">
            <div className="grid md:grid-cols-6 sm:grid-cols-2 md:gap-4 md:h-[10px]">
                {Object.values(CategoryIconEnum).map((el: CategoryIconEnum) => <Tooltip key={el} content={el.replaceAll('_', ' ')}>
                    <div
                        className={classNames(
                            [styles.iconContainer], {
                            [styles.active]: el === value
                        })}
                        onClick={() => { onChange(el) }}>
                        <CategoryIcon icon={el} showContainer={true} />
                    </div>
                </Tooltip>)}
            </div>
        </ScrollShadow >
    )
}