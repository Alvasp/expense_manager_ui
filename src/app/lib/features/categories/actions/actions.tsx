'use server'

import { fetchCategories, fetchMovementTypes, saveCategory, updateCategory, deleteCategory as _deleteCategory } from "@/app/lib/database/movements-repository"
import { IMovementCategory } from "@/app/lib/types/definitions"
import { Constants } from "@/app/lib/utils/constants"
import { revalidateTag, unstable_cache } from "next/cache"

export const getCategories = unstable_cache(fetchCategories, ['categories'], {
    tags: [Constants.CACHE.CATEGORIES],
    revalidate: 3600
})

export const getMovementTypes = unstable_cache(fetchMovementTypes, ['movementTypes'], {
    tags: ['categories'],
    revalidate: 3600
})

export async function createCategory(category: IMovementCategory) {
    const cat = await saveCategory(category);
    await revalidate()
    return cat;
}

export async function editCategory(category: IMovementCategory) {
    await updateCategory(category)
    await revalidate()
}

export async function deleteCategory(id: number) {
    await _deleteCategory(id)
    await revalidate()
}

async function revalidate() {
    revalidateTag(Constants.CACHE.CATEGORIES)
    revalidateTag(Constants.CACHE.MOVEMENTS)
}


