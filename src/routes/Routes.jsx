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
import ContentManagement from "../pages/Dashboard/Common/ContentManagement";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import MyDonationRequests from "../pages/Dashboard/Common/MyDonationRequests";
import UpdateRequest from "../pages/Dashboard/UpdateRequest/UpdateRequest";
import AddBlog from "../pages/Dashboard/Admin/ContentManagement/AddBlog/AddBlog";
import Blog from "../pages/Blog/Blog";
import DonationRequests from "../pages/DonationRequests/DonationRequests";
import DonationRequestsDetails from "../pages/DonationRequestsDetails/DonationRequestsDetails";
import SearchPage from "../pages/SearchPage/SearchPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "/donation-requests",
                element: <DonationRequests />
            },
            {
                path: "/donation-requests/:id",
                element: <PrivateRoutes><DonationRequestsDetails /></PrivateRoutes> ,
                loader: ({params}) => fetch(`http://localhost:5000/request/${params.id}`)
            },
            {
                path: "/blog",
                element: <Blog />
            },
            {
                path: "/searchPage",
                element: <SearchPage />
            },
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
                element: <AllDonationRequests />,
                loader: () => fetch('http://localhost:5000/requestsCount'),
            },
            {
                path: 'content-management',
                element: <ContentManagement />
            },
            {
                path: 'content-management/add-blog',
                element: <AddBlog />
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