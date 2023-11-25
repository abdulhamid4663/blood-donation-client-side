import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useDistricts from "../../../hooks/useDistricts";
import useUpazilas from "../../../hooks/useUpazilas";
import useAuth from "../../../hooks/useAuth";
import axiosSecure from "../../../api/axiosSecure";

function UpdateRequest() {
    const request = useLoaderData();
    const [districts] = useDistricts();
    const [upazilas] = useUpazilas();
    const { user } = useAuth();
    const [selectedDistrict, setSelectedDistrict] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/upazilas/${request?.district}`)
            .then(res => {
                setSelectedDistrict(res.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, [request.district])

    const handleDistrictChange = async e => {
        const { data } = await axiosSecure.get(`/upazilas/${e.target.value}`)
        setSelectedDistrict(data)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const recipient = form.recipient.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const hospital = form.hospital.value;
        const address = form.address.value;
        const date = form.date.value;
        const time = form.time.value;
        const message = form.message.value;

        try {

            const requestDoc = {
                name,
                email,
                recipient,
                district,
                upazila,
                hospital,
                address,
                date,
                time,
                message,
            }
            
            const { data } = await axiosSecure.patch(`/requests/${request?._id}`, requestDoc);
            if (data?.modifiedCount > 0 || data?.matchedCount > 0) {
                toast.success('Request has been Updated successfully.');
                navigate('/dashboard/my-donation-requests');
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <Card color="transparent" className="w-full px-6 md:px-4 pt-8 pb-12" shadow={false}>
                <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full max-w-screen-lg mx-auto ">
                    <Typography variant="h3" color="blue-gray" className="text-center lg:text-start">
                        Create Donation Request
                    </Typography>
                    <Typography variant="paragraph" color="gray" className="mt-2 font-normal max-w-4xl mx-auto lg:mx-0 text-center lg:text-start">
                        Welcome to the heart of compassion and hope. By creating a donation request, you&apos;re taking a powerful step towards saving lives. This page serves as a bridge between those in urgent need of blood and the generous donors ready to make a life-changing difference.
                    </Typography>
                    <div className="mb-1 flex flex-col gap-6 mt-8">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full">
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    Your Name
                                </Typography>
                                <Input
                                    name="name"
                                    size="lg"
                                    placeholder="John Doe"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    defaultValue={user?.displayName}
                                    disabled
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    Your Email
                                </Typography>
                                <Input
                                    type="email"
                                    name="email"
                                    size="lg"
                                    placeholder="name@mail.com"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    defaultValue={user?.email}
                                    disabled
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full">
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    Recipient name
                                </Typography>
                                <Input
                                    name="recipient"
                                    size="lg"
                                    placeholder="Recipient name"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    defaultValue={request?.recipient}
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    Recipient District
                                </Typography>

                                <select defaultValue={request?.district} required name="district" onChange={handleDistrictChange} className="w-full py-3 border-[1px] border-[#B0BEC5] rounded-md bg-transparent px-3" >
                                    {
                                        districts?.map((district) => <option className="bg-white" key={district._id} value={`${district?.name}`}>{district.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="w-full">
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    Recipient Upazila
                                </Typography>
                                <select defaultValue={request?.upazila} required name="upazila" className="w-full py-3 border-[1px] border-[#B0BEC5] rounded-md bg-transparent px-3" size="md">
                                    {
                                        selectedDistrict?.length > 0
                                            ?
                                            <>
                                                {
                                                    selectedDistrict?.map((upazila) => <option className="bg-white" key={upazila._id} value={`${upazila?.name}`}>{upazila.name}</option>)
                                                }
                                            </>
                                            :
                                            <>
                                                {
                                                    upazilas?.map((upazila) => <option className="bg-white" key={upazila._id} value={`${upazila?.name}`}>{upazila.name}</option>)
                                                }
                                            </>
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full">
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    Hospital Name
                                </Typography>
                                <Input
                                    name="hospital"
                                    size="lg"
                                    placeholder="ex: Dhaka-Medical-College"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    defaultValue={request?.hospital}
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    Address Line
                                </Typography>
                                <Input
                                    name="address"
                                    size="lg"
                                    placeholder="ex: Zahir Raihan Rd, Dhaka"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    defaultValue={request?.address}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full">
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    Blood Group
                                </Typography>
                                <select defaultValue={request?.bloodType} name="bloodType" className="w-full py-3 border-[1px] border-[#B0BEC5] rounded-md bg-transparent px-3" size="md" required>
                                    <option value='A+'>A+</option>
                                    <option value='A-'>A-</option>
                                    <option value='B+'>B+</option>
                                    <option value='B-'>B-</option>
                                    <option value='AB+'>AB+</option>
                                    <option value='AB-'>AB-</option>
                                    <option value='O+'>O+</option>
                                    <option value='O-'>O-</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    Donation Date
                                </Typography>
                                <Input
                                    name="date"
                                    type="date"
                                    size="lg"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    defaultValue={request?.date}
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    Donation Time
                                </Typography>
                                <Input
                                    name="time"
                                    type="time"
                                    size="lg"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    defaultValue={request?.time}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full">
                                <Textarea
                                    variant="outlined"
                                    name="message"
                                    label="Message"
                                    defaultValue={request?.message}
                                />
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className="mt-6 bg-red-600" fullWidth>
                        Update Request
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default UpdateRequest;