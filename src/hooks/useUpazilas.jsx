import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";


const useUpazilas = () => {
    const { data: upazilas = [] } = useQuery({
        queryKey: ['upazilas'],
        queryFn: async () => {
            const res = await axiosSecure.get('/upazilas');
            return res.data;
        }
    })

    return [upazilas]
};

export default useUpazilas;