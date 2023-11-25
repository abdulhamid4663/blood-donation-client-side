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
import Profile from "../pages/Dashboard/Common/Profile";
import MyDonationRequests from "../pages/Dashboard/Common/MyDonationRequests";
import UpdateRequest from "../pages/Dashboard/UpdateRequest/UpdateRequest";

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
                element: <MyDonationRequests />
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
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'updateRequest/:id',
                element: <UpdateRequest />,
                loader: ({params}) => fetch(`http://localhost:5000/request/${params.id}`)
            },
        ]
    },
])

export default router;