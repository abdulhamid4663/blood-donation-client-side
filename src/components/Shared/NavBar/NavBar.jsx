import React from "react";
import logo from "../../../assets/logo.png"
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Collapse,
    MenuItem,
    MenuList,
    Avatar,
    MenuHandler,
    Menu,
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import useAuth from "../../../hooks/useAuth";

export function NavBar() {
    const { user, userLogout } = useAuth();
    const [openNav, setOpenNav] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
                    to='/blog'
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
                    to='/donate-money'
                    className={({ isActive }) =>
                        isActive
                            ? "text-[#FD2C2D]"
                            : "text-black hover:text-[#FD2C2D] transition-all duration-200 ease-in-out"
                    }
                >
                    Donate Money
                </NavLink>
            </Typography>
        </ul>
    );

    return (
        <div className="sticky top-0 z-10 max-h-[768px] w-full">
            <Navbar className=" h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900 max-w-7xl mx-auto">
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
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        {
                            user ? ""
                                :
                                <div className="flex items-center gap-x-1">
                                    <Link to='/signIn'>
                                        <Button
                                            variant="outlined"
                                            size="sm"
                                            className="hidden lg:inline-block"
                                        >
                                            <span>Sign in</span>
                                        </Button>
                                    </Link>
                                    <Link to='/register'>
                                        <Button
                                            variant="outlined"
                                            size="sm"
                                            className="hidden border-[#FD2C2D] text-white bg-[#FD2C2D] lg:inline-block"
                                        >
                                            <span>Register</span>
                                        </Button>
                                    </Link>
                                </div>
                        }
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
                        {
                            user &&
                            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                                <MenuHandler>
                                    <Button
                                        variant="text"
                                        color="blue-gray"
                                        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 "
                                    >
                                        <Avatar
                                            variant="circular"
                                            size="sm"
                                            alt="tania andrew"
                                            className="border border-gray-900 p-0.5"
                                            src={user ? user?.photoURL : "https://i.ibb.co/17gTnnr/default-avatar.png"}
                                        />
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </Button>
                                </MenuHandler>
                                <MenuList className="p-1">
                                    <Link to='/dashboard'>
                                        <MenuItem
                                            className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                                </svg>
                                                <Typography
                                                    as="span"
                                                    variant="small"
                                                    className="font-normal"
                                                >
                                                    Dashboard
                                                </Typography>
                                            </div>
                                        </MenuItem>
                                    </Link>
                                    <Link to='/dashboard/profile'>
                                        <MenuItem
                                            className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <Typography
                                                    as="span"
                                                    variant="small"
                                                    className="font-normal"
                                                >
                                                    Profile
                                                </Typography>
                                            </div>
                                        </MenuItem>
                                    </Link>
                                    <MenuItem
                                        className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10`}
                                        onClick={userLogout}
                                    >
                                        <div className="flex items-center gap-2 text-red-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                                            </svg>

                                            <Typography
                                                as="span"
                                                variant="small"
                                                className="font-normal text-red-300"
                                            >
                                                Sign Out
                                            </Typography>
                                        </div>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        }
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Link className="w-full" to='/signIn'>
                            <Button fullWidth variant="text" size="sm" className="">
                                <span>Sign In</span>
                            </Button>
                        </Link>
                        <Link className="w-full" to='/register'>
                            <Button
                                fullWidth
                                variant="outlined"
                                size="sm"
                                className=" border-[#FD2C2D] text-white bg-[#FD2C2D]"
                            >
                                <span>Register</span>
                            </Button>
                        </Link>
                    </div>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;