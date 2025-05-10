import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";

import { queryClient } from "@/lib/query-client";
import { router } from "@/routes/router";
import { Toaster  } from 'sonner';


export function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <RouterProvider router={router} />
          <Toaster position="bottom-right" richColors={true} />
      </QueryClientProvider>
    </div>

  );
}
