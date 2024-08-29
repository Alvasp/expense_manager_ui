import PageTitle from "@/app/lib/components/layout/title";
import { getMovements } from "@/app/lib/features/dashboard/actions/actions";
import AggregatedDataSkeleton from "@/app/lib/features/dashboard/components/aggregatedData/aggregated-data-skeleton.server";
import AggregatedData from "@/app/lib/features/dashboard/components/aggregatedData/aggregated-data.client";
import Balance from "@/app/lib/features/dashboard/components/balance/balance.server";
import Fab from "@/app/lib/features/dashboard/components/fab/fab.client";
import PeriodFilterSkeleton from "@/app/lib/features/dashboard/components/periodFilter/period-filter-skeleton.server";
import PeriodFilter from "@/app/lib/features/dashboard/components/periodFilter/period-filter.client";
import StoreCriteriaInitializer from "@/app/lib/features/dashboard/components/store-criteria-initializer";
import { IDashboardPageCriteria } from "@/app/lib/features/dashboard/types/definitions";
import { isNumber } from "lodash";
import moment from "moment";
import { Suspense } from "react";

type SearchParamType = { slug?: string[] }
export default async function DashboardPage({
  params,
}:
  { params: SearchParamType }
) {

  const filter = filterFromSlug(params);

  //using a promise to stream client components
  const data = getMovements(filter.year, filter.month)

  return (
    <StoreCriteriaInitializer criteria={filter}>
      <PageTitle title={"Dashboard"} icon={"monitoring"} />


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
