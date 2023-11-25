import { Typography } from "@material-tailwind/react";
import useAuth from "../../hooks/useAuth";


const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="py-10 px-8">
            <Typography
                className="text-3xl font-medium"
            >
                Hi {user?.displayName}! Welcome back!
            </Typography>
            <div>
                
            </div>
        </div>
    );
};

export default Dashboard;