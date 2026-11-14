import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import {
  PAGE_SIZE,
  getArchaeologicalSites,
  getCountdown,
  getDistrictData,
  getPeoplePage,
  getProductsPage,
  getProgram,
  getProgramsPage,
  type Page,
} from "./apiService";

const nextOffset = <T,>(last: Page<T>) => (last.meta.hasMore ? last.meta.nextOffset ?? undefined : undefined);

/** Programs, 10 per page; the next page loads when the user scrolls near the end of the list. */
export const programsInfiniteQuery = infiniteQueryOptions({
  queryKey: ["programs", "infinite"],
  queryFn: ({ pageParam }) => getProgramsPage(pageParam, PAGE_SIZE),
  initialPageParam: 0,
  getNextPageParam: nextOffset,
});

export const productsInfiniteQuery = infiniteQueryOptions({
  queryKey: ["products", "infinite"],
  queryFn: ({ pageParam }) => getProductsPage(pageParam, PAGE_SIZE),
  initialPageParam: 0,
  getNextPageParam: nextOffset,
});

export const peopleInfiniteQuery = infiniteQueryOptions({
  queryKey: ["people", "infinite"],
  queryFn: ({ pageParam }) => getPeoplePage(pageParam, PAGE_SIZE),
  initialPageParam: 0,
  getNextPageParam: nextOffset,
});

/** Home page shows only the latest three programs. */
export const latestProgramsQuery = queryOptions({
  queryKey: ["programs", "latest", 3],
  queryFn: async () => (await getProgramsPage(0, 3)).items,
});

export const programQuery = (id: number) =>
  queryOptions({ queryKey: ["program", id], queryFn: () => getProgram(id), enabled: Number.isFinite(id) && id > 0 });

export const programSearchQuery = (q: string) =>
  queryOptions({ queryKey: ["programs", "search", q], queryFn: async () => (await getProgramsPage(0, 5, q)).items, enabled: q.length > 1 });
export const productSearchQuery = (q: string) =>
  queryOptions({ queryKey: ["products", "search", q], queryFn: async () => (await getProductsPage(0, 5, q)).items, enabled: q.length > 1 });

export const sitesQuery = queryOptions({ queryKey: ["sites"], queryFn: getArchaeologicalSites });
export const districtsQuery = queryOptions({ queryKey: ["districts"], queryFn: getDistrictData });
export const countdownQuery = queryOptions({ queryKey: ["countdown"], queryFn: getCountdown });
