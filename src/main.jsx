import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import { store } from "./redux/store.js";

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")).render(
    <HelmetProvider>
        <BrowserRouter>
            <Suspense>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </QueryClientProvider>
            </Suspense>
        </BrowserRouter>
    </HelmetProvider>
);
