"use client";

import { ERRORS, MAX_RETRY_QUERIES } from "@/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        if (error?.response?.data?.message?.includes(ERRORS.TokenExpiredError)) {
          return false;
        }
        return failureCount < MAX_RETRY_QUERIES;
      },
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      throwOnError: true,
      retryDelay: 500,
    },
  },
});

function getQueryClient() {
  return queryClient;
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      )}
    </QueryClientProvider>
  );
}
