import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, Router } from "@tanstack/react-router";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a new router instance
const router = new Router({ routeTree });
const queryClient = new QueryClient();

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
