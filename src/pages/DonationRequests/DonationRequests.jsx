import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";
import { Typography } from "@material-tailwind/react";
import DonationRequestsCard from "../../components/DonationRequests/DonationRequestsCard";
import { Helmet } from "react-helmet-async";


const DonationRequests = () => {

    const { data: requests = [] } = useQuery({
        queryKey: ['pendings'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/pendingRequests?pending=pending`);
            return data;
        }
    })

    return (
        <div className="bg-gray-200">
            <Helmet>
                <title>Donation Request || LifeFlow</title>
            </Helmet>
            <div className="pt-12 pb-32 max-w-7xl mx-auto px-6 md:px-4">
                <Typography color="blue-gray" className="text-center text-2xl lg:text-4xl font-medium mb-7">
                    View and Respond to Urgent Donation Appeals
                </Typography>
                <Typography color="blue-gray" variant="paragraph" className="max-w-lg lg:max-w-2xl mb-32 mx-auto text-center">
                    Welcome to our virtual Blood Bank, where you can view and respond to urgent blood donation appeals. Every response can mean the difference between life and loss. Explore the requests and play a crucial role in replenishing the gift of life.
                </Typography>
                <hr className='border-gray-600 mt-4 mb-6' />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {
                        requests?.map(request => <DonationRequestsCard key={request?._id} request={request} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default DonationRequests;