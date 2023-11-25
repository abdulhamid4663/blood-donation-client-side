import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import logo from "../../../assets/logo.png"
import { Link } from "react-router-dom";
import DonorMenus from "../Donor/DonorMenus";
import useRole from "../../../hooks/useRole";
import AdminMenus from "../Admin/AdminMenus";
import useAuth from "../../../hooks/useAuth";
import VolunteerMenus from "../Volunteer/VolunteerMenus";

function Sidebar() {
    const { role } = useRole();
    const { userLogout } = useAuth();

    return (
        <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl bg-red-50 shadow-blue-gray-900/5">
            <div className="mb-2 p-4 max-w-fit">
                <Link to="/">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="" className="w-5 lg:w-8" />
                        <Typography

                            className="text-xl lg:text-3xl cursor-pointer font-medium"
                        >
                            <span className="text-[#FD2C2D]">Life</span>Flow
                        </Typography>

                    </div>
                </Link>
            </div>
            <List>
                {
                    role === 'admin' && <AdminMenus />
                }
                {
                    role === 'donor' && <DonorMenus />
                }
                {
                    role === "volunteer" && <VolunteerMenus />
                }
                <ListItem>
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Profile
                </ListItem>
                <ListItem
                    onClick={userLogout}
                >
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
}

export default Sidebar;