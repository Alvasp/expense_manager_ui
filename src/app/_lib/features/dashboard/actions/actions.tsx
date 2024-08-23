'use server'

import { addMovement as _addMovement, fetchMovements as _fetchMovements, updateMovement as _updateMovement, addMovementException as _addMovementException, deleteMovement as _deleteMovement } from "@/app/_lib/database/movements-repository";
import { IMovement } from "@/app/_lib/types/definitions";
import { revalidateTag, unstable_cache } from "next/cache";

export type OcurrencyModeSingle = {
    type: 'single',
    forDate: Date
}

export type OcurrencyModeMultiple = {
    type: 'multiple',
}

export type OcurrencyMode = OcurrencyModeSingle | OcurrencyModeMultiple

export const getMovements = unstable_cache(fetchMovements, ['movements'], {
    tags: ['movements'],
    revalidate: 3600
})

export async function fetchMovements(year: number, month: number) {
    return await _fetchMovements(year, month);
}

export async function addMovement(movement: IMovement): Promise<IMovement> {
    const _movement = await _addMovement(movement)
    revalidateTag('movements');
    return { ...movement, id: _movement.id }
}

export async function updateSingleMovement(movement: IMovement): Promise<void> {
    await _updateMovement(movement)
}

export async function updateRecurrentMovement(movement: IMovement, mode: OcurrencyMode) {
    if (mode.type === 'multiple') {
        await updateSingleMovement(movement);
        revalidateTag('movements');
        return;
    }

    await _addMovement(movement)
    await _addMovementException(movement.id, mode.forDate);

    revalidateTag('movements')
}

export async function deleteSingleMovement(id: number): Promise<void> {
    await _deleteMovement(id)
    revalidateTag('movements')
}

export async function deleteRecurrentMovement(id: number, mode: OcurrencyMode) {
    if (mode.type === 'multiple') {
        await _deleteMovement(id);
        revalidateTag('movements')
        return;
    }

    await _addMovementException(id, mode.forDate);
    revalidateTag('movements')
}
