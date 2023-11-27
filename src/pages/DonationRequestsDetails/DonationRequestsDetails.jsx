import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axiosSecure from "../../api/axiosSecure";
import toast from "react-hot-toast";


const DonationRequestsDetails = () => {
    const request = useLoaderData();
    const navigate = useNavigate();

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
            const { data } = await axiosSecure.patch(`/requestToInprogress/${request?._id}`, requestDoc)
            if (data?.modifiedCount > 0) {
                toast.success('Thank you for Donating');
                navigate('/donation-requests', {replace: true});
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="bg-gray-200 py-20">
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
                    <Button onClick={handleDonate} color="red" className="w-full">Donate</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default DonationRequestsDetails;