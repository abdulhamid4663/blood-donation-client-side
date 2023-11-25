import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreateDonationRequest from "../pages/Dashboard/Common/CreateDonationRequest";
import AllDonationRequests from "../pages/Dashboard/Common/AllDonationRequests";
import ContentManagement from "../pages/Dashboard/Admin/ContentManagement/ContentManagement";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/signIn",
        element: <SignIn />
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'my-donation-requests',
                element: <div>my donation requests</div>
            },
            {
                path: 'create-donation-request',
                element: <CreateDonationRequest />
            },
            {
                path: 'all-donation-requests',
                element: <AllDonationRequests />
            },
            {
                path: 'content-management',
                element: <ContentManagement />
            },
            {
                path: 'create-donation-request',
                element: <CreateDonationRequest />
            },
            {
                path: 'users',
                element: <AllUsers />
            },

        ]
    },
])

export default router;