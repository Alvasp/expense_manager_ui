
import { Suspense } from "react";
import { IDashboardPageCriteria } from "../../../_lib/features/dashboard/types/definitions";
import Balance from "../../../_lib/features/dashboard/components/balance/balance.server";
import PeriodFilter from "../../../_lib/features/dashboard/components/periodFilter/period-filter.client";
import PeriodFilterSkeleton from "../../../_lib/features/dashboard/components/periodFilter/period-filter-skeleton.server";
import { isNumber } from "lodash";
import moment from "moment";
import Fab from "@/app/_lib/features/dashboard/components/fab/fab.client";
import AggregatedData from "@/app/_lib/features/dashboard/components/aggregatedData/aggregated-data.client";
import AggregatedDataSkeleton from "@/app/_lib/features/dashboard/components/aggregatedData/aggregated-data-skeleton.server";
import StoreCriteriaInitializer from "@/app/_lib/features/dashboard/components/store-criteria-initializer";
import { getMovements } from "@/app/_lib/features/dashboard/actions/actions";

type SearchParamType = { slug?: string[] }
export default async function Page({
  params,
}:
  { params: SearchParamType }
) {

  const filter = filterFromSlug(params);

  //using a promise to stream client components
  const data = getMovements(filter.year, filter.month)

  return (
    <StoreCriteriaInitializer criteria={filter}>
      <div className="mb-5 flex justify-end">
        <Suspense fallback={<PeriodFilterSkeleton />}>
          <PeriodFilter criteria={filter} data={data} />
        </Suspense>
      </div>
      <div className="mb-5">
        <Balance dataPromise={data} />
      </div>

      <Suspense fallback={<AggregatedDataSkeleton />}>
        <AggregatedData dataPromise={data} criteria={filter} />
      </Suspense>
      <Fab />
    </StoreCriteriaInitializer>
  )
}

const filterFromSlug = (params: SearchParamType): IDashboardPageCriteria => {
  const filter: IDashboardPageCriteria = {
    year: moment().year(),
    month: moment().month() + 1
  }

  const _slug = params.slug || []

  if (_slug.length < 2) {
    return filter;
  }

  if (isNumber(Number(_slug.at(1))) && _slug.at(1)!.length === 6) {
    filter.year = Number(_slug.at(1)!.substring(0, 4));
    filter.month = Number(_slug.at(1)!.substring(4))
  }

  return filter;
}
