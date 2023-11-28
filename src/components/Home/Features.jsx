import { Typography } from "@material-tailwind/react";


const Features = () => {
    return (
        <div className="pt-32 max-w-6xl mx-auto px-8 md:px-6 lg:px-4">
            <Typography
                color="blue-gray"
                className="text-center lg:mb-10 text-3xl lg:text-5xl font-semibold"
            >
                Our Services
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-0">
                <div className="">
                    <div className="">
                        <img src="https://i.ibb.co/377NBMQ/stock-photo-always-available.jpg" alt="profile-picture" className="w-36 h-36 mx-auto" />
                    </div>
                    <div className="text-center">
                        <Typography color="blue-gray" className="mb-2 text-base md:text-xl font-medium ">
                            24/7 Availability
                        </Typography>
                        <Typography color="blue-gray" variant="small" className="">
                            Always accessible, our services operate around the clock to meet blood donation requests promptly.
                        </Typography>
                    </div>
                </div>
                <div className="md:mt-8">
                    <div className="">
                        <img src="https://i.ibb.co/N9BpBTz/safsdfdsasdfadfa.png" alt="profile-picture" className="w-36 h-36 mx-auto" />
                    </div>
                    <div className="text-center">
                        <Typography color="blue-gray" className="mb-2 text-base md:text-xl font-medium ">
                            Blood Bank for Urgent Needs
                        </Typography>
                        <Typography color="blue-gray" variant="small" className="">
                            Access our blood bank—a reliable source for various blood types, available to meet urgent needs and contribute to life-saving efforts
                        </Typography>
                    </div>
                </div>
                <div className="md:mt-16">
                    <div className="">
                        <img src="https://i.ibb.co/YQmX47C/sdafsdfsdf.png" alt="profile-picture" className="w-36 h-36 mx-auto" />
                    </div>
                    <div className="text-center">
                        <Typography color="blue-gray" className="mb-2 text-base md:text-xl font-medium ">
                            Blood Donation Requests
                        </Typography>
                        <Typography color="blue-gray" variant="small" className="">
                            24/7 support for urgent blood donation requests, connecting those in need with compassionate donors instantly.
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;