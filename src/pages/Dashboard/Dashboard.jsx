import { Typography } from "@material-tailwind/react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import DonorHome from "../../components/Dashboard/Donor/DonorHome";
import AdminHome from "../../components/Dashboard/Admin/AdminHome";
import { Helmet } from "react-helmet-async";


const Dashboard = () => {
    const { user } = useAuth();
    const { userRole } = useRole();

    return (
        <div>
            <Helmet>
                <title>Dashboard || LifeFlow</title>
            </Helmet>
            <div className="py-10 px-8">
                <Typography
                    className="text-xl md:text-2xl lg:text-3xl font-medium"
                >
                    Hi {user?.displayName}! Welcome back!
                </Typography>
                <div>
                    {
                        userRole === "admin" || userRole === "volunteer" ? <AdminHome /> : <DonorHome />
                    }
                </div>
            </div>
        </div>
    );
};

export default Dashboard;