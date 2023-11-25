import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axiosSecure from "../api/axiosSecure";

const useRole = () => {
    const { user, loading } = useAuth();

    const { data: role = '' } = useQuery({
        queryKey: ['role'],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}`);
            return data.role;
        }
    })

    return {role}
};

export default useRole;