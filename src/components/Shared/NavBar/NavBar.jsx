import React from "react";
import logo from "../../../assets/logo.png"
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

export function NavBar() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="h6"
                className="p-1 font-normal"
            >
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#FD2C2D]"
                        : "text-black hover:text-[#FD2C2D] transition-all duration-200 ease-in-out"
                    }
                  >
                    Home
                  </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="h6"
                className="p-1 font-normal"
            >
                <NavLink
                    to='/donation-requests'
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#FD2C2D]"
                        : "text-black hover:text-[#FD2C2D] transition-all duration-200 ease-in-out"
                    }
                  >
                    Donation Requests
                  </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="h6"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink
                    to='/account'
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#FD2C2D]"
                        : "text-black hover:text-[#FD2C2D] transition-all duration-200 ease-in-out"
                    }
                  >
                    Blog
                  </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="h6"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink
                    to='/blocks'
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#FD2C2D]"
                        : "text-black hover:text-[#FD2C2D] transition-all duration-200 ease-in-out"
                    }
                  >
                    Contact Us
                  </NavLink>
            </Typography>
        </ul>
    );

    return (
        <div className="sticky top-0 z-10 max-h-[768px] w-full">
            <Navbar className=" h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="" className="w-8"/>
                        <Typography
                            as="a"
                            href="#"
                            className="text-3xl cursor-pointer font-medium"
                        >
                            <span className="text-[#FD2C2D]">Life</span>Flow
                        </Typography>

                    </div>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <div className="flex items-center gap-x-1">
                            <Button
                                variant="outlined"
                                size="sm"
                                className="hidden lg:inline-block"
                            >
                                <span>Sign in</span>
                            </Button>
                            <Button
                                variant="outlined"
                                size="sm"
                                className="hidden border-[#FD2C2D] text-white bg-[#FD2C2D] lg:inline-block"
                            >
                                <span>Register</span>
                            </Button>
                        </div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
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
                            )}
                        </IconButton>
                    </div>
                </div>
                <MobileNav open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Button fullWidth variant="text" size="sm" className="">
                            <span>Log In</span>
                        </Button>
                        <Button fullWidth variant="gradient" size="sm" className="">
                            <span>Sign in</span>
                        </Button>
                    </div>
                </MobileNav>
            </Navbar>
        </div>
    );
}

export default NavBar;