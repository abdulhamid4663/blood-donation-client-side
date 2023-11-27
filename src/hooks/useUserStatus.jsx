import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axiosSecure from "../api/axiosSecure";


const useUserStatus = () => {
    const { user, loading } = useAuth();

    const { data: userStatus = '' } = useQuery({
        queryKey: ['status'],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/userStatus/${user?.email}`);
            return data.status;
        }
    })

    return {userStatus}
};

export default useUserStatus;