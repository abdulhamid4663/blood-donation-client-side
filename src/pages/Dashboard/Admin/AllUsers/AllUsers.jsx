import { Card, Typography } from "@material-tailwind/react";
import AllUsersTable from "../../../../components/Table/AllUsersTable";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import { useState } from "react";

const TABLE_HEAD = ["#", "Image", "Name", "Email", "Status", "Role", "Block/Unblock", "Role Action"];
const AllUsers = () => {
    const [sortValue, setSortValue] = useState('');

    const { data: users = [], refetch } = useQuery({
        queryKey: ['user', sortValue],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users?sort=${sortValue}`);
            return data;
        }
    })

    const handleOnChange = e => {
        setSortValue(e.target.value)
        console.log(e.target.value);
        refetch()
    }

    return (
        <div className="py-12 px-4 lg:px-6 xl:px-12">
            <Typography
                color="blue-gray"
                className="text-center text-2xl lg:text-4xl font-medium mb-7"
            >
                User Management
            </Typography>
            <div className="text-end">
                <select onChange={handleOnChange} defaultValue='default' name="" id="" className="py-2 px-4 mb-3 text-sm border-blue-gray-700 rounded-lg">
                    <option value="default" disabled className="text-xs text-gray-500">Filter By Status</option>
                    <option value="all" className="text-xs text-gray-700">All</option>
                    <option value="blocked" className="text-xs text-gray-700">Blocked</option>
                    <option value="active" className="text-xs text-gray-700">Active</option>
                </select>
            </div>
            <div className="flex overflow-x-auto items-center justify-center">
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
                            {users?.map((user, index) => <AllUsersTable key={user._id} user={user} index={index} refetch={refetch} />)}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
};

export default AllUsers;