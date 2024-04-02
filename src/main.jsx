import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")).render(
    <HelmetProvider>
        <BrowserRouter>
            <Suspense>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </Suspense>
        </BrowserRouter>
    </HelmetProvider>
);
