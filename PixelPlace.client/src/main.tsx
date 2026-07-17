import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./apollo/client.ts";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-black text-white">
        <RouterProvider router={router} />
      </div>
    </ApolloProvider>
  </StrictMode>,
);
