import { Helmet } from "react-helmet-async";
import DonationsTable from "../../../components/Table/DonationsTable";
import useRequests from "../../../hooks/useRequests";

import {
    Card,
    Typography,
} from "@material-tailwind/react";

const TABLE_HEAD = ["#", "Recipient", "District", "Upazila", "Date", "Time", "Status", "Action"];

const MyDonationRequests = () => {
    const [requests, refetch] = useRequests();

    return (
        <div className="py-12 px-4 lg:px-6 xl:px-12">
            <Helmet>
                <title>My Donation Requests || LifeFlow</title>
            </Helmet>
            <Typography
                variant="lead"
                className="text-center text-2xl lg:text-4xl font-medium mb-7"
            >
                My Donation Requests
            </Typography>
            <div className="flex overflow-auto items-center justify-center">
                <Card className="h-full w-full">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="">
                                {TABLE_HEAD?.map((head, index) => (
                                    <th
                                        key={index}
                                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {requests?.map((request, index) => <DonationsTable key={request._id} donation={request} index={index} refetch={refetch} /> )}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
}

export default MyDonationRequests;