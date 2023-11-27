import { Button, Card, Typography } from "@material-tailwind/react";
import DonationsTable from "../../../components/Table/DonationsTable";
import { useLoaderData } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";
import useAuth from "../../../hooks/useAuth";

const TABLE_HEAD = ["#", "Recipient", "District", "Upazila", "Date", "Time", "Status", "Action"];
const AllDonationRequests = () => {
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(0);
    const { count } = useLoaderData();
    const dataPerPage = 10;
    const dataPages = Math.ceil(count / dataPerPage);
    const pages = [...Array(dataPages).keys()]

    const { data: requests = [], refetch } = useQuery({
        queryKey: ['donations', currentPage],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/requests/${user?.email}?page=${currentPage}`)
            return data;
        }
    })

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }


    return (
        <div className="py-12 px-4 lg:px-6 xl:px-12">
            <Typography
                variant="lead"
                color="blue-gray"
                className="text-center text-2xl lg:text-4xl font-medium mb-7"
            >
                All Donation Requests
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
                            {
                                requests?.map((request, index) => <DonationsTable key={request._id} donation={request} index={index} refetch={refetch} />)
                            }
                        </tbody>
                    </table>
                    <tfoot className="text-center">
                        <div className="flex items-center gap-8 mt-3 justify-center">
                            <Button
                                size="sm"
                                variant="filled"
                                onClick={handlePrevious}
                            >
                                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                            </Button>
                            <Typography color="gray" className="font-normal flex items-center gap-1">

                                <div>
                                    Page <strong className="text-gray-900">{currentPage + 1}</strong> of{' '}
                                    <strong className="text-gray-900">{pages.length}</strong>
                                </div>
                            </Typography>
                            <Button
                                size="sm"
                                variant="filled"
                                onClick={handleNext}
                            >
                                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                            </Button>
                        </div>
                    </tfoot>
                </Card>
            </div>
        </div>
    );
};

export default AllDonationRequests;