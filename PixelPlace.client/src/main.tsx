import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./apollo/client.ts";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRouter.tsx";
import { NotifyProvider } from "./lib/Notify/NotifyProvider.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <TooltipProvider>
        <div className="min-h-screen bg-transparent text-foreground">
          <RouterProvider router={router} />

          <NotifyProvider position="bottom-center" />
        </div>
      </TooltipProvider>
    </ApolloProvider>
  </StrictMode>,
);
