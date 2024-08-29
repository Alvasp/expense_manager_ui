'use server'

import { addMovement as _addMovement, fetchMovements as _fetchMovements, updateMovement as _updateMovement, addMovementException as _addMovementException, deleteMovement as _deleteMovement } from "@/app/lib/database/movements-repository";
import { IMovement } from "@/app/lib/types/definitions";
import { revalidateTag, unstable_cache } from "next/cache";
import { Constants } from "@/app/lib/utils/constants";

export type OcurrencyModeSingle = {
    type: 'single',
    forDate: Date
}

export type OcurrencyModeMultiple = {
    type: 'multiple',
}

export type OcurrencyMode = OcurrencyModeSingle | OcurrencyModeMultiple

export const getMovements = unstable_cache(fetchMovements, ['movements'], {
    tags: [Constants.CACHE.MOVEMENTS],
    revalidate: 3600
})
// export const getMovements = fetchMovements

export async function fetchMovements(year: number, month: number) {
    return await _fetchMovements(year, month);
}

export async function addMovement(movement: IMovement): Promise<IMovement> {
    const _movement = await _addMovement(movement)
    await revalidate();
    return { ...movement, id: _movement.id }
}

export async function updateSingleMovement(movement: IMovement): Promise<void> {
    await _updateMovement(movement)
    await revalidate();
}

export async function updateRecurrentMovement(movement: IMovement, mode: OcurrencyMode) {
    if (mode.type === 'multiple') {
        await updateSingleMovement(movement);
        return;
    }

    await _addMovement(movement)
    await _addMovementException(movement.id, mode.forDate);

    await revalidate()
}

export async function deleteSingleMovement(id: number): Promise<void> {
    await _deleteMovement(id)
    await revalidate()
}

export async function deleteRecurrentMovement(id: number, mode: OcurrencyMode) {
    if (mode.type === 'multiple') {
        await _deleteMovement(id);
        await revalidate()
        return;
    }

    await _addMovementException(id, mode.forDate);
    await revalidate()
}


async function revalidate() {
    revalidateTag(Constants.CACHE.MOVEMENTS)
    revalidateTag(Constants.CACHE.ACCOUNTS)
}