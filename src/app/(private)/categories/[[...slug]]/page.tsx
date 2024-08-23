import { Fragment, Suspense } from "react"
import CategoryFilter from "../../../_lib/features/categories/components/category-filter.client"
import { CategoryViewType, categoryViewTypes } from "../../../_lib/features/categories/types/definitions"
import CategoryList from "@/app/_lib/features/categories/components/category-list.client"
import CategoryListSkeleton from "@/app/_lib/features/categories/components/category-list-skeleton.server"
import CategoryFilterSkeleton from "@/app/_lib/features/categories/components/categories-filter-skeleton.server"
import { getCategories } from "@/app/_lib/features/categories/actions/actions"
import dynamic from "next/dynamic"

type SearchParamType = { slug?: string[] }

export default async function page({
    params,
}:
    { params: SearchParamType }) {

    const filter = filterFromSlug(params);

    const categories = getCategories().then(res => res.filter(el => el.type.id === (filter === 'incomes' ? 1 : 2)))

    return (
        <Fragment>
            <div className="flex justify-between mb-20">
                <Suspense fallback={<CategoryFilterSkeleton />}>
                    <CategoryFilter selectedFilter={filter} dataProm={categories} />
                </Suspense>
                {/* <Button color='primary'>Añadir</Button> */}
            </div>

            <Suspense fallback={<CategoryListSkeleton />}>
                <CategoryList values={categories} />
            </Suspense>
        </Fragment>
    )
}

const filterFromSlug = (params: SearchParamType): CategoryViewType => {
    const _slug = params.slug || []

    if (_slug.length > 0) {
        const index = categoryViewTypes.indexOf(_slug.at(0) as CategoryViewType)
        if (index > -1) {
            return categoryViewTypes.at(index)!
        }
    }

    return 'incomes';
}

