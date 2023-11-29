import { Card, Typography } from "@material-tailwind/react";
import Payment from "../../components/Payment/Payment";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";
import { Helmet } from "react-helmet-async";


const TABLE_HEAD = ["#", "Transaction Id", "Email", "Donation Amount", "Date"];
const DonateMoney = () => {

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/payments');
            return data;
        }
    })

    return (
        <div className="pt-12 pb-32 px-4 lg:px-6 xl:px-12">
            <Helmet>
                <title>Donate Money || LifeFlow</title>
            </Helmet>
            <Typography color="blue-gray" className="text-center text-2xl lg:text-4xl font-medium mb-7">
                Donate Money to Support Our Cause
            </Typography>
            <Typography color="blue-gray" variant="paragraph" className="max-w-lg lg:max-w-2xl mb-32 mx-auto text-center">
                Join hands with us in making a positive impact! Your generous financial contribution will directly contribute to our mission of saving lives and improving healthcare. Every donation, no matter the size, helps us provide essential resources, support, and medical assistance to those in need. Together, we can make a difference in the lives of individuals and communities. Thank you for considering a donation to support our organization&apos;s commitment to a healthier and brighter future for all.
            </Typography>
            <div>
                <Payment />
            </div>
            <div>
                {/* Donation History Table */}
                <div className="py-12 px-4 lg:px-6 xl:px-12 max-w-5xl mx-auto">
                    <Typography
                        variant="lead"
                        color="blue-gray"
                        className="text-center text-xl lg:text-2xl font-medium mb-7"
                    >
                        Donation History
                    </Typography>
                    <div className="flex overflow-auto items-center justify-center">
                        <Card className="h-full w-full">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="">
                                        {TABLE_HEAD?.map((head, index) => (
                                            <th
                                                key={index}
                                                className="border-b border-blue-gray-100 bg-blue-gray-50 py-3 px-2"
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
                                    {
                                        payments?.map((payment, index) => {
                                            return (
                                                <tr key={payment._id}>
                                                    <td>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal pl-2"
                                                        >
                                                            {index + 1}
                                                        </Typography>
                                                    </td>
                                                    <td>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal pl-2"
                                                        >
                                                            {payment?.transactionId}
                                                        </Typography>
                                                    </td>
                                                    <td>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal pl-2"
                                                        >
                                                            {payment?.email}
                                                        </Typography>
                                                    </td>
                                                    <td>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal pl-2"
                                                        >
                                                            ${payment?.amount}
                                                        </Typography>
                                                    </td>
                                                    <td>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal pl-2"
                                                        >
                                                            {payment?.date}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonateMoney;