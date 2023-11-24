import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";

const useDistricts = () => {
    const { data: districts } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/districts');
            
            return res.data;
        }
    })

    return [districts]
};

export default useDistricts;