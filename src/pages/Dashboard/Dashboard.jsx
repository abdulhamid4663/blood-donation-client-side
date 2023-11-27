import { Typography } from "@material-tailwind/react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import DonorHome from "../../components/Dashboard/Donor/DonorHome";


const Dashboard = () => {
    const { user } = useAuth();
    const { userRole } = useRole();

    return (
        <div className="py-10 px-8">
            <Typography
                className="text-3xl font-medium"
            >
                Hi {user?.displayName}! Welcome back!
            </Typography>
            <div>
                {
                    userRole === "donor" && <DonorHome />
                }
            </div>
        </div>
    );
};

export default Dashboard;