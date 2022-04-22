import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: typeof window === "undefined" ? Infinity : 3600000, // 1hr for client and Infinity for server
      cacheTime: Infinity, // disable garbage collection
    },
  },
});
export default queryClient;
