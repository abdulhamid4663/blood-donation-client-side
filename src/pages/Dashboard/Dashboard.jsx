import { Typography } from "@material-tailwind/react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import DonorHome from "../../components/Dashboard/Donor/DonorHome";
import AdminHome from "../../components/Dashboard/Admin/AdminHome";


const Dashboard = () => {
    const { user } = useAuth();
    const { userRole } = useRole();

    return (
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
    );
};

export default Dashboard;