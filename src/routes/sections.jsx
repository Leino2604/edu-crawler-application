import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../layouts";

export const IndexPage = lazy(() => import("../pages/app"));
export const BlogPage = lazy(() => import("../pages/blog"));
export const UserPage = lazy(() => import("../pages/user"));
export const LoginPage = lazy(() => import("../pages/login"));
export const SpiderPage = lazy(() => import("../pages/spider"));
export const ArticlePage = lazy(() => import("../pages/article"));
export const RegisterPage = lazy(() => import("../pages/register"));
export const ProductsPage = lazy(() => import("../pages/products"));
export const Page404 = lazy(() => import("../pages/page-not-found"));
export const WebpageSpiderPage = lazy(() => import("../pages/webpage-spider"));
export const WebsiteSpiderPage = lazy(() => import("../pages/website-spider"));

// ----------------------------------------------------------------------

// function ProtectedRoute() {
//   const { isAuthenticated } = useContext(AppContext)
//   return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
// }

// function RejectedRoute() {
//   const { isAuthenticated } = useContext(AppContext)
//   return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
// }

export default function Router() {
    const routes = useRoutes([
        {
            element: (
                <DashboardLayout>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </DashboardLayout>
            ),
            children: [
                { element: <IndexPage />, index: true },
                { path: "user", element: <UserPage /> },
                { path: "products", element: <ProductsPage /> },
                { path: "blog", element: <BlogPage /> },
                { path: "spider", element: <SpiderPage /> },
                { path: "websitespider", element: <WebsiteSpiderPage /> },
                { path: "webpagespider", element: <WebpageSpiderPage /> },
                { path: "article", element: <ArticlePage /> },
            ],
        },
        {
            path: "login",
            element: <LoginPage />,
        },
        {
            path: "register",
            element: <RegisterPage />,
        },
        {
            path: "404",
            element: <Page404 />,
        },
        {
            path: "*",
            element: <Navigate to="/404" replace />,
        },
    ]);

    return routes;
}
