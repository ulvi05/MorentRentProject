import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo } from "react";

import { AvailabilityFilter } from "@/components/shared/availability-filter";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { RentCard } from "@/components/shared/rent-card";
import { RenderIf } from "@/components/shared/RenderIf";
import { Filters } from "./components/Filters";
import rentService from "@/services/rent";
import { LIST_TAKE_COUNT } from "@/constants";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Rent } from "@/types";
import { ClipLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";
import DynamicHelmet from "@/components/shared/DynamicHelmet";

const RentListPage = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.RENT_LIST, searchParams.toString()],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      rentService.getAll(
        {
          take: LIST_TAKE_COUNT,
          skip: pageParam,
        },
        searchParams.toString()
      ),
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
    <>
      <DynamicHelmet pageTitle="List Page" />
      <div className="grid xl:grid-cols-[360px,1fr]">
        <ScrollToTop />
        <Filters />
        <div className="bg-white" />
        <div className="flex flex-col px-6 pt-6 pb-10 gap-y-6 lg:px-8 lg:pt-8 lg:gap-y-8">
          <AvailabilityFilter />
          <InfiniteScroll
            dataLength={rents.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={
              <div className="flex flex-col items-center mx-auto mt-4 w-60 gap-x-3 text-muted-foreground">
                <ClipLoader />
                <p>Loading more items...</p>
              </div>
            }
            endMessage={
              <RenderIf condition={!isLoading}>
                <p className="mt-4 text-center text-muted-foreground">
                  No more items to show
                </p>
              </RenderIf>
            }
          >
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
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default RentListPage;
