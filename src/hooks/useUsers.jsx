import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axiosSecure from "../api/axiosSecure";

const useUsers = () => {
    const { loading } = useAuth();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users`);
            return data;
        }
    })

    return {users, refetch}
};

export default useUsers;