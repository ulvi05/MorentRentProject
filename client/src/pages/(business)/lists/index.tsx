import { RentCard } from "@/components/shared/rent-card";
import { Filters } from "./components/Filters";
import { AvailabilityFilter } from "@/components/shared/availability-filter";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { LIST_TAKE_COUNT } from "@/constants";
import { QUERY_KEYS } from "@/constants/query-keys";
import rentService from "@/services/rent";
import { Rent } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { RenderIf } from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";

const RentListPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.RENT_LIST],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      rentService.getAll({
        take: LIST_TAKE_COUNT,
        skip: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const hasNextPage =
        lastPage.data.total > lastPage.data.skip + lastPage.data.take;
      if (!hasNextPage) return null;
      return lastPage.data.skip + lastPage.data.take;
    },
  });

  const rents = useMemo(() => {
    if (!data) return [];
    return data.pages.reduce((prev: Rent[], page) => {
      return [...prev, ...page.data.items];
    }, []);
  }, [data]);

  return (
    <div className="grid xl:grid-cols-[360px,1fr]">
      <ScrollToTop />
      <Filters />
      <div className="bg-white" />
      <div className="flex flex-col px-6 pt-6 gap-y-6 lg:px-8 lg:pt-8 lg:gap-y-8">
        <AvailabilityFilter />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          <RenderIf condition={isLoading}>
            {[...Array(LIST_TAKE_COUNT)].map((_, index) => (
              <RentCard.Skeleton key={index} />
            ))}
          </RenderIf>

          {rents.map((rent) => (
            <RentCard key={rent._id} rent={rent} />
          ))}
        </div>
        <Button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          Load More
        </Button>
      </div>
    </div>
  );
};

export default RentListPage;
