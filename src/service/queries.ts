import { queryOptions } from "@tanstack/react-query";
import { getPrograms, getProducts, getPeopleData, getArchaeologicalSites, getDistrictData, getCountdown } from "./apiService";

export const programsQuery = queryOptions({ queryKey: ["programs"], queryFn: async () => (await getPrograms()).data });
export const productsQuery = queryOptions({ queryKey: ["products"], queryFn: async () => (await getProducts()).data });
export const peopleQuery = queryOptions({ queryKey: ["people"], queryFn: async () => (await getPeopleData()).data });
export const sitesQuery = queryOptions({ queryKey: ["sites"], queryFn: async () => (await getArchaeologicalSites()).data });
export const districtsQuery = queryOptions({ queryKey: ["districts"], queryFn: async () => (await getDistrictData()).data });
export const countdownQuery = queryOptions({ queryKey: ["countdown"], queryFn: async () => (await getCountdown()).data });
