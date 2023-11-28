import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <>
            <div className="hidden items-center gap-8 max-w-7xl mx-auto lg:flex">
                <figure className="w-1/2">
                    <img src="https://i.ibb.co/f4X5GhS/shutterstock-107831225.jpg" alt="" className="w-full h-[600px]" />
                </figure>
                <div className="w-1/2">
                    <Typography
                        variant="h1"
                        color="blue-gray"
                        className="max-w-md pb-4"
                    >

                        Gift of Life Awaits Your Donation
                    </Typography>
                    <Typography
                        variant="small"
                        color="gray"
                        className="max-w-xl"
                    >
                        Discover the incredible gift that lies within you. By donating blood, you offer hope and healing to those in need. Your veins carry the potential to be a source of life for someone facing a medical crisis. Join us in this meaningful journey of making a difference through the simple act of blood donation
                    </Typography>
                    <div className="flex gap-3 mt-8">
                        <Button
                            variant="outlined"
                            className="border-[#FD2C2D] text-white bg-[#FD2C2D] inline-block"
                        >
                            Join as a donor
                        </Button>
                        <Link to='/searchPage'>
                            <Button
                                variant="outlined"
                                className="flex items-center gap-2"
                            >
                                Search Donors
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center lg:hidden" style={{ backgroundImage: "url('https://i.ibb.co/f4X5GhS/shutterstock-107831225.jpg')", backgroundRepeat: 'no-repeat', width: '100%', maxWidth: "100%", height: '550px', backgroundColor: '#0000005c', backgroundBlendMode: 'multiply', objectFit: 'contain' }}>
                <div className="px-4">
                    <Typography
                        variant="h3"
                        color="white"
                        className="max-w-md pb-4"
                    >

                        Gift of Life Awaits Your Donation
                    </Typography>
                    <Typography
                        variant="small"
                        color="white"
                        className="max-w-xl"
                    >
                        Discover the incredible gift that lies within you. By donating blood, you offer hope and healing to those in need. Your veins carry the potential to be a source of life for someone facing a medical crisis. Join us in this meaningful journey of making a difference through the simple act of blood donation
                    </Typography>
                    <div className="flex gap-3 mt-8">
                        <Button
                            variant="outlined"
                            size="sm"
                            className="border-[#FD2C2D] text-white bg-[#FD2C2D] inline-block"
                        >
                            Join as a donor
                        </Button>
                        <Link to='/searchPage'>
                            <Button
                                variant="outlined"
                                size="sm"
                                className="flex border-white text-white items-center gap-2"
                            >
                                Search Donors
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;