import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { SearchContextProvider } from "./contexts/SearchContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="bottom-right" />
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
          <RouterProvider router={router} />
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
