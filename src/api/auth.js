import axiosSecure from "./axiosSecure";

export const clearCookie = async () => {
    const { data } = await axiosSecure.get(`/logout`);
    return data;
}