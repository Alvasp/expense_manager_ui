import PageTitle from "@/app/lib/components/layout/title";
import { getCategories } from "@/app/lib/features/categories/actions/actions";
import CategoryFilterSkeleton from "@/app/lib/features/categories/components/categories-filter-skeleton.server";
import CategoryAddEditModal from "@/app/lib/features/categories/components/category-add-edit-modal.client";
import CategoryFilter from "@/app/lib/features/categories/components/category-filter.client";
import CategoryListSkeleton from "@/app/lib/features/categories/components/category-list-skeleton.server";
import CategoryList from "@/app/lib/features/categories/components/category-list.client";
import { CategoryViewType, categoryViewTypes } from "@/app/lib/features/categories/types/definitions";
import { CategoryIconEnum } from "@/app/lib/types/definitions";
import { Button } from "@nextui-org/react";
import { Fragment, Suspense } from "react";

type SearchParamType = { slug?: string[] }

export default async function CategoriesPage({
    params,
}:
    { params: SearchParamType }) {

    const filter = filterFromSlug(params);

    const categories = getCategories().then(res => res.filter(el => el.type.id === (filter === 'incomes' ? 1 : 2)))

    return (
        <Fragment>
            <PageTitle title={"Categories"} icon={"category"} />

            <div className="flex justify-between mb-10 mt-8">
                <Suspense fallback={<CategoryFilterSkeleton />}>
                    <CategoryFilter selectedFilter={filter} dataProm={categories} />
                </Suspense>

                <CategoryAddEditModal
                    launcher={<Button color="primary">Añadir</Button>}
                    defaultValues={{ id: 0, name: '', type: { id: filter === 'incomes' ? 1 : 2, name: filter }, icon: CategoryIconEnum.account_balance, system: false }} />

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

