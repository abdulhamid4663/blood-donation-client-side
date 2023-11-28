import { Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";

const AdminHome = () => {

    const { data: stats = {} } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/allStats');
            return data;
        }
    })

    return (
        <div className="py-12">
            <Typography
                variant="lead"
                color="blue-gray"
                className="text-2xl lg:text-4xl font-medium mb-7"
            >
                Dashboard
            </Typography>
            <div className="">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <div className="bg-gray-200 h-32 md:h-40 flex justify-center items-center gap-4 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 lg:w-10 h-6 lg:h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                            <div className="text-start text-xl lg:text-3xl font-medium">
                                {stats.users}
                                <Typography
                                    className="text-base md:text-xl font-medium"
                                >
                                    Users
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-200 h-32 md:h-40 flex justify-center items-center gap-4 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 lg:w-10 h-6 lg:h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg>
                            <div className="text-start text-xl lg:text-3xl font-medium">
                                {stats.requests}
                                <Typography
                                    className="text-base md:text-xl font-medium"
                                >
                                    Requests
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-200 h-32 md:h-40 flex justify-center items-center gap-4 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 lg:w-10 h-6 lg:h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-start text-xl lg:text-3xl font-medium">
                                ${stats.totalAmount}
                                <Typography
                                    className="text-base md:text-xl font-medium"
                                >
                                    Funds
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default AdminHome;