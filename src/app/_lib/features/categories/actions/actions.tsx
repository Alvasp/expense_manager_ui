import { fetchCategories, fetchMovementTypes } from "@/app/_lib/database/movements-repository"
import { unstable_cache } from "next/cache"

export const getCategories = unstable_cache(fetchCategories, ['categories'], {
    tags: ['categories'],
    revalidate: 3600
})
// export const getCategories = fetchCategories
export const getMovementTypes = unstable_cache(fetchMovementTypes, ['movementTypes'], {
    tags: ['movementTypes'],
    revalidate: 3600
})

