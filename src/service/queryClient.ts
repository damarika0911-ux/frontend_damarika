import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "./http.ts";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (count, error) => count < 1 && !(error instanceof ApiError && error.status >= 400 && error.status < 500 && error.status !== 408),
    },
    mutations: { retry: false },
  },
});
