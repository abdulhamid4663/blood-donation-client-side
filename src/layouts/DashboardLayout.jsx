import React from "react";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { Drawer, IconButton, Typography } from "@material-tailwind/react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png"

const DashboardLayout = () => {
    const [open, setOpen] = React.useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="">
                <div className="block lg:hidden">
                    <React.Fragment>
                        <div className="flex justify-between items-center px-4">
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
                            <div>
                                <IconButton
                                    variant="text"
                                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden "
                                    ripple={false}
                                    onClick={openDrawer}
                                >

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>

                                </IconButton>
                            </div>
                        </div>
                        <Drawer open={open} onClose={closeDrawer} className="">
                            <Sidebar />
                        </Drawer>
                    </React.Fragment>
                </div>
                <div className="hidden lg:block">
                    <Sidebar />
                </div>
            </div>
            <div className="w-full bg-gray-50">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;