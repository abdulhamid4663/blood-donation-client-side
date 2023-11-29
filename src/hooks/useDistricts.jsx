import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";

const useDistricts = () => {
    const { data: districts = [], isLoading: districtLoading, } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/districts');
            
            return res.data;
        }
    })

    return [districts, districtLoading ]
};

export default useDistricts;