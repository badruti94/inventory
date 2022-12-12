import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import ItemPage from "../pages/ItemPage";
import RegisterPage from "../pages/RegisterPage";
import CreateItemPage from "../pages/CreateItemPage";
import CreateReportPage from "../pages/CreateReportPage";
import ReportPage from "../pages/ReportPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ItemPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/item",
        element: <ItemPage />
    },
    {
        path: "/item/create",
        element: <CreateItemPage />
    },
    {
        path: "/report",
        element: <ReportPage />
    },
    {
        path: "/report/create",
        element: <CreateReportPage />
    },
]);

const Routes = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Routes