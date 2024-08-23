import Icon from '@mui/material/Icon';
import { CategoryIconColorDefinition, CategoryIconEnum } from '../types/definitions';
import classNames from 'classnames';
// https://developers.google.com/fonts/docs/material_icons

export type MaterialIconProps = {
    icon: CategoryIconEnum,
    color?: string,
    size?: "small" | "large" | "medium",
    showContainer?: boolean
}

const fontMap = new Map<string, number>(
    [
        ['small', 35],
        ['medium', 50],
        ['large', 75]
    ]
)

export default function CategoryIcon({ icon, color, size = 'medium', showContainer = false }: MaterialIconProps) {
    const _size = `${fontMap.get(size)!}px`
    return (
        <div
            className={classNames('', {
                'rounded-full p-4 border-solid border-white flex justify-center items-center': showContainer === true
            })}
            style={{ backgroundColor: color || CategoryIconColorDefinition.get(icon), width: _size, height: _size }}>
            <Icon
                style={{
                    display: 'flex',
                    color: 'white',
                    fontSize: (fontMap.get(size)! - 15)
                }}>
                {icon.valueOf()}
            </Icon >
        </div >
    )
}

