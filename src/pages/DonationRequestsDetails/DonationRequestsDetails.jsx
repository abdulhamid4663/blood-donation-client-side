import { Button, Card, CardBody, CardFooter, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axiosSecure from "../../api/axiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";


const DonationRequestsDetails = () => {
    const { user } = useAuth();
    const request = useLoaderData();
    const navigate = useNavigate();
    const [size, setSize] = useState(null);

    const handleOpen = (value) => setSize(value);

    const handleDonate = async () => {

        const requestDoc = {
            name: request?.name,
            email: request?.email,
            recipient: request?.recipient,
            district: request?.district,
            upazila: request?.upazila,
            hospital: request?.hospital,
            address: request?.address,
            bloodType: request?.bloodType,
            date: request?.date,
            time: request?.time,
            message: request?.message,
            status: "inprogress"
        }
        try {
            const { data } = await axiosSecure.patch(`/requestStatusChange/${request?._id}`, requestDoc)
            if (data?.modifiedCount > 0) {
                toast.success('Thank you for Donating');
                navigate('/donation-requests', { replace: true });
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="bg-gray-200 py-20 px-6 md:px-4">
            <Helmet>
                <title>Donation Request Details || LifeFlow</title>
            </Helmet>
            <Typography color="blue-gray" className="text-center text-2xl lg:text-4xl font-medium mb-7">
                Donation Request Details
            </Typography>
            <Card className="mt-6 max-w-4xl mx-auto">
                <CardBody>
                    <Typography color="gray" className="mb-2 text-base lg:text-lg font-medium">
                        Requested By: <span className="text-red-400">{request?.name}</span>
                    </Typography>
                    <Typography color="gray" className="mb-2 text-base lg:text-lg font-medium">
                        Recipient Name: <span className="text-red-400">{request?.recipient}</span>
                    </Typography>
                    <Typography color="gray" className="mb-2 text-base lg:text-lg font-medium">
                        Blood Type: <span className="text-red-400">{request?.bloodType}</span>
                    </Typography>
                    <Typography color="gray" className="mb-2 text-base lg:text-lg font-medium">
                        District: <span className="text-red-400">{request?.district}</span>
                    </Typography>
                    <Typography color="gray" className="mb-2 text-base lg:text-lg font-medium">
                        Upazila: <span className="text-red-400">{request?.upazila}</span>
                    </Typography>
                    <Typography color="gray" className="mb-2 text-base lg:text-lg font-medium">
                        Hospital Name: <span className="text-red-400">{request?.hospital}</span>
                    </Typography>
                    <Typography color="gray" className="mb-2 text-base lg:text-lg font-medium">
                        Address: <span className="text-red-400">{request?.address}</span>
                    </Typography>
                    <Typography color="gray" className="mb-2 text-base lg:text-lg font-medium">
                        Message: <span className="text-red-400">{request?.message}</span>
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button onClick={() => handleOpen("sm")} variant="gradient" color="red" className="w-full">
                        Donate
                    </Button>
                </CardFooter>
            </Card>
            <Dialog
                open={
                    size === "xs" ||
                    size === "sm" ||
                    size === "md" ||
                    size === "lg" ||
                    size === "xl" ||
                    size === "xxl"
                }
                size={size || "md"}
                handler={handleOpen}
            >
                <DialogHeader>Confirm the donation.</DialogHeader>
                <DialogBody className="lg:flex gap-6">
                    <div className="w-full">
                        <Typography variant="small" color="blue-gray">
                            Name:
                        </Typography>
                        <Input label="Name" disabled variant="outlined" defaultValue={user?.displayName} className="w-full" />
                    </div>
                    <div className="w-full">
                        <Typography variant="small" color="blue-gray">
                            Email:
                        </Typography>
                        <Input label="Email" disabled variant="outlined" defaultValue={user?.email} className="w-full"/>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => handleOpen(null)}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={() => { handleOpen(null); handleDonate(); }}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default DonationRequestsDetails;