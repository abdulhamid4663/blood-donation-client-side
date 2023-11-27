import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axiosSecure from "../api/axiosSecure";


const useRequests = () => {
    const { user, loading } = useAuth();

    const { data: requests = [], refetch, isFetching } = useQuery({
        queryKey: ['requests'],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/requests/${user?.email}`);
            return data;
        }
    })

    return [requests, refetch, isFetching]
};

export default useRequests;