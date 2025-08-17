import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { createQueryClient } from "@/shared/api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = createQueryClient();

// experimental
persistQueryClient({
  queryClient,
  persister: createAsyncStoragePersister({
    storage: {
      getItem: async (key: string) => localStorage.getItem(key),
      setItem: async (key: string, value: string) =>
        localStorage.setItem(key, value),
      removeItem: async (key: string) => localStorage.removeItem(key),
    },
  }),
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
});

export default function RestProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
        buttonPosition="bottom-left"
        position="left"
        initialIsOpen
      />
    </QueryClientProvider>
  );
}
