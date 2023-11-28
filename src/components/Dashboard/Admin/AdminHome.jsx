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
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
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
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                            <div className="text-start text-xl lg:text-3xl font-medium">
                                {stats.users}
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