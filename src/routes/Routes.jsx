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
import DonateMoney from "../pages/DonateMoney/DonateMoney";
import AdminRoute from "./AdminRoute";
import AdminVolunteerRoute from "./AdminVolunteerRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import UpdateBlog from "../pages/Dashboard/Admin/ContentManagement/UpdateBlog";
import BlogSingle from "../pages/Blog/BlogSingle";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
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
                loader: ({params}) => fetch(`https://life-flow-server.vercel.app/request/${params.id}`)
            },
            {
                path: "/blog",
                element: <Blog />,
            },
            {
                path: "/blog/:id",
                element: <BlogSingle />
            },
            {
                path: "/searchPage",
                element: <SearchPage />
            },
            {
                path: "/donate-money",
                element: <DonateMoney />
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
                loader: () => fetch('https://life-flow-server.vercel.app/requestsCount'),
            },
            {
                path: 'content-management',
                element: <AdminVolunteerRoute><ContentManagement /></AdminVolunteerRoute>
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
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'updateRequest/:id',
                element: <UpdateRequest />,
                loader: ({params}) => fetch(`https://life-flow-server.vercel.app/request/${params.id}`)
            },
            {
                path: 'content-management/:id',
                element: <UpdateBlog />,
            },
        ]
    },
])

export default router;