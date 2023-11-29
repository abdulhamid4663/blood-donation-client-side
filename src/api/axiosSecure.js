import axios from "axios";
import { clearCookie } from "./auth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

axiosSecure.interceptors.response.use(response => response, async error => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
        await clearCookie();
        window.location.replace('/signIn')
    }
})


export default axiosSecure;