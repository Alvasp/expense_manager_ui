import { useEffect, useState } from "react";

type NestedKeyOf<T> = T extends object
    ? { [K in keyof T & (string | number)]: `${K}` | `${K}.${NestedKeyOf<T[K]>}` }[keyof T & (string | number)]
    : never;


export function useFilter<T>(collection: Array<T>, filterField: NestedKeyOf<T>, filterWord?: string) {
    const [filteredItems, setFilteredItems] = useState<Array<T>>(collection)

    useEffect(() => {
        if (!filterWord) {
            setFilteredItems(collection);
            return
        }

        const getValue = (obj: any, path: string) => {
            return path.split('.').reduce((value, key) => value[key], obj);
        };

        setFilteredItems(
            collection.filter(el => {
                const value = getValue(el, filterField);
                return typeof value === 'string' && value?.toLocaleLowerCase().includes(filterWord.toLocaleLowerCase());
            })
        );

    }, [collection, filterField, filterWord])

    return { filteredItems }
}